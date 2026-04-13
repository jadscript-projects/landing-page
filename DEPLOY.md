# Deploy to Google Cloud Storage

This repository uses the workflow [`.github/workflows/deploy-gcs.yml`](.github/workflows/deploy-gcs.yml): on push to `main` (or a manual run), the app is built with Vite and the contents of `dist/` are synced to a GCS bucket.

## If key creation fails: `iam.disableServiceAccountKeyCreation`

If `gcloud iam service-accounts keys create` returns:

`FAILED_PRECONDITION: Key creation is not allowed on this service account`  
`type: constraints/iam.disableServiceAccountKeyCreation`

your **organization or project** blocks service account JSON keys. You **cannot** use the `GCP_SA_KEY` secret. Use **Workload Identity Federation (WIF)** instead ([section 1.4](#14-workload-identity-federation-no-json-key)) and set **`GCP_USE_WIF=true`** in GitHub ([section 3](#3-github)).

Only a GCP org admin can relax that constraint; WIF is the intended workaround.

---

## What you need to configure

### Option A — Workload Identity Federation (recommended when keys are blocked)

| Where | Name | Description |
|------|------|-------------|
| **Variables** | `GCP_USE_WIF` | `true` |
| **Variables** | `GCP_WORKLOAD_IDENTITY_PROVIDER` | Full provider resource name (from CLI output below) |
| **Variables** | `GCP_SERVICE_ACCOUNT` | Service account email (e.g. `github-actions-gcs-deploy@….iam.gserviceaccount.com`) |
| **Variables** | `GCP_BUCKET` | `landing-page` (or your bucket name) |

No `GCP_SA_KEY` secret.

### Option B — JSON key (only if your org allows key creation)

| Where | Name | Description |
|------|------|-------------|
| **Variables** | `GCP_BUCKET` | `landing-page` (or your bucket name) |
| **Secrets** | `GCP_SA_KEY` | Full JSON key |

Do **not** set `GCP_USE_WIF` to `true` (leave unset or use any value other than `true` for key-based auth).

---

## 1. GCP via `gcloud` CLI

**Prerequisites**

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (`gcloud`) installed.
- A GCP **project** with **billing** enabled.
- `gcloud auth login`
- Set your project:

```bash
export PROJECT_ID="your-gcp-project-id"
gcloud config set project "$PROJECT_ID"
```

### 1.1 Enable the Cloud Storage API

```bash
gcloud services enable storage.googleapis.com
```

### 1.2 Create the bucket (`landing-page`)

Bucket names are **global**. If `landing-page` is taken, pick another name and use it for `GCP_BUCKET`.

```bash
export BUCKET_NAME="landing-page"
export REGION="southamerica-east1"

gcloud storage buckets create "gs://${BUCKET_NAME}" \
  --location="${REGION}" \
  --uniform-bucket-level-access
```

### 1.3 Create a service account and grant bucket access

```bash
export SA_NAME="github-actions-gcs-deploy"

gcloud iam service-accounts create "${SA_NAME}" \
  --display-name="GitHub Actions GCS deploy" \
  --project="${PROJECT_ID}"

export SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud storage buckets add-iam-policy-binding "gs://${BUCKET_NAME}" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/storage.objectAdmin" \
  --project="${PROJECT_ID}"
```

`roles/storage.objectAdmin` is required for `gcloud storage rsync` with `--delete-unmatched-destination-objects`.

### 1.4 Workload Identity Federation (no JSON key)

Use this when **JSON keys are disabled** or you prefer keyless auth. Replace **`GITHUB_OWNER`** and **`GITHUB_REPO`** with your GitHub **owner** (user or org) and **repository name** (e.g. `jadscript` and `landing-page`).

```bash
export PROJECT_NUMBER=$(gcloud projects describe "${PROJECT_ID}" --format='value(projectNumber)')
export POOL_ID="github-actions"
export PROVIDER_ID="github"
export GITHUB_OWNER="YOUR_GITHUB_USER_OR_ORG"
export GITHUB_REPO="YOUR_REPO_NAME"

gcloud services enable iamcredentials.googleapis.com sts.googleapis.com

gcloud iam workload-identity-pools create "${POOL_ID}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="GitHub Actions"

gcloud iam workload-identity-pools providers create-oidc "${PROVIDER_ID}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="${POOL_ID}" \
  --display-name="GitHub OIDC" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
  --attribute-condition='attribute.repository == assertion.repository && attribute.repository_owner == assertion.repository_owner'

gcloud iam service-accounts add-iam-policy-binding "${SA_EMAIL}" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${GITHUB_OWNER}/${GITHUB_REPO}"
```

Copy the **workload identity provider** resource name into GitHub variable `GCP_WORKLOAD_IDENTITY_PROVIDER`:

```bash
echo "projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}"
```

Set `GCP_SERVICE_ACCOUNT` to `"${SA_EMAIL}"`.

#### Why `--attribute-condition` is required here

If you map custom attributes such as `attribute.repository` / `attribute.repository_owner`, Google Cloud expects an **attribute condition** that references **both** those mapped attributes **and** the OIDC **`assertion.*`** claims. A common pattern (also used in the [Terraform GitHub example](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/iam_workload_identity_pool_provider#example-usage---iam-workload-identity-pool-provider-github-actions)) is this **pass-through** CEL expression:

`attribute.repository == assertion.repository && attribute.repository_owner == assertion.repository_owner`

It is always true for valid tokens but satisfies validation. Without it, `create-oidc` can fail with:

`INVALID_ARGUMENT: The attribute condition must reference one of the provider's claims`

even when you did not pass `--attribute-condition` yourself — see [this explanation](https://stackoverflow.com/questions/79082721/why-is-this-workload-identity-pool-not-being-created).

#### Optional: also restrict to one GitHub org or repo

Keep the pass-through above and **append** extra checks with `&&`, for example only allow org `my-org`:

```bash
gcloud iam workload-identity-pools providers update-oidc "${PROVIDER_ID}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="${POOL_ID}" \
  --attribute-condition="attribute.repository == assertion.repository && attribute.repository_owner == assertion.repository_owner && assertion.repository_owner=='my-org'"
```

Use **ASCII** quotes when pasting into the shell.

#### Troubleshooting: same `INVALID_ARGUMENT` after fixing the command

If a provider was created in a bad state, delete and recreate:

```bash
gcloud iam workload-identity-pools providers delete "${PROVIDER_ID}" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="${POOL_ID}"
```

References: [Google — WIF with GitHub](https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines), [Conditions](https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines#conditions), [google-github-actions/auth](https://github.com/google-github-actions/auth#workload-identity-federation).

### 1.5 JSON key (only if policy allows)

Skip this if you use **section 1.4**. If `keys create` fails with `iam.disableServiceAccountKeyCreation`, you **must** use WIF.

```bash
gcloud iam service-accounts keys create ./github-actions-gcs-key.json \
  --iam-account="${SA_EMAIL}" \
  --project="${PROJECT_ID}"
```

Paste the JSON into GitHub secret `GCP_SA_KEY`, then `rm ./github-actions-gcs-key.json`.

### 1.6 Optional: public static website

The workflow only **uploads** files. For public reads, configure bucket permissions or **Load Balancer + CDN**. See [Hosting a static website](https://cloud.google.com/storage/docs/hosting-static-website).

---

## 2. Alternative: Google Cloud Console

Same outcomes as above: enable APIs, create bucket, service account, bucket IAM; for WIF you still need the pool/provider/bindings (CLI or Cloud Console **Workload Identity Federation**).

---

## 3. GitHub

### 3.1 Variables

**Settings** → **Secrets and variables** → **Actions** → **Variables**:

| Name | Value |
|------|--------|
| `GCP_BUCKET` | `landing-page` (or your bucket) |
| `GCP_USE_WIF` | `true` if using [section 1.4](#14-workload-identity-federation-no-json-key); omit or not `true` for JSON key |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Output of the `echo` in section 1.4 (WIF only) |
| `GCP_SERVICE_ACCOUNT` | `SA_EMAIL` (WIF only) |

### 3.2 Secret `GCP_SA_KEY` (key-based auth only)

**Secrets** → **New repository secret** → name `GCP_SA_KEY` → paste full JSON. Not used when `GCP_USE_WIF=true`.

### 3.3 Branch and triggers

- Runs on **push to `main`**. Change `on.push.branches` in the workflow if needed.
- Manual: **Actions** → **Deploy to GCS** → **Run workflow**.

---

## 4. Verify it worked

1. **GitHub → Actions:** latest run green.
2. **GCP → Cloud Storage →** bucket: build output at the root, mirroring `dist/`.

---

## 5. Workflow quick reference

- **Build:** `pnpm run build` → `dist/`.
- **Deploy:** `gcloud storage rsync` with `--delete-unmatched-destination-objects`.

If WIF auth fails, check `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT`, and that the **principal** in `add-iam-policy-binding` matches **`owner/repo`** exactly (case-sensitive).

---

## 6. Your values (fill in — keep secrets out of git)

**Do not commit real credentials.** Use **GitHub Secrets/Variables** or a gitignored file like `DEPLOY.secrets.md`.

| Item | Your value |
|------|------------|
| GCP **project ID** | |
| **Bucket** (`GCP_BUCKET`) | `landing-page` |
| **Service account email** | |
| **WIF:** `GCP_USE_WIF` | `true` |
| **WIF:** `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/…/locations/global/workloadIdentityPools/github-actions/providers/github` |
| **Key path:** `GCP_SA_KEY` | *(GitHub Secret only — only if keys allowed)* |

```text
PROJECT_ID=
SA_EMAIL=
GCP_BUCKET=landing-page
GCP_WORKLOAD_IDENTITY_PROVIDER=
GCP_SERVICE_ACCOUNT=
```
