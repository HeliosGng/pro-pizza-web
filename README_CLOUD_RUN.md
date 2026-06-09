# 🚀 Deploying Pro Pizza Tirana to Google Cloud Run

This guide contains step-by-step instructions to containerize your React Single Page Application (SPA) and host it securely on **Google Cloud Run** after downloading or exporting the codebase.

---

## 📋 Prerequisites

Before deploying, ensure you have the following installed on your machine:
1. **Docker**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop/) (needed for local testing).
2. **Google Cloud SDK (gcloud CLI)**: [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/install).
3. **Google Cloud Project**: An active GCP project with the billing enabled.

---

## 🛠️ Step 1: Verify the Code Locally

Before pushing to the cloud, you can test the production-built dockerized application on your own machine.

### 1. Build the Docker Image
Run the following command in the root folder of your project (where the `Dockerfile` is located):
```bash
docker build -t pro-pizza-app .
```

### 2. Run the Container Locally
Launch the application locally mapping port `8080`:
```bash
docker run -dp 8080:8080 --name propizza-test pro-pizza-app
```
* Now open **`http://localhost:8080`** in your browser to verify that the application runs, filters products, and has the responsive drawer basket fully functioning in a modular container environment!
* To stop the container afterward, run:
  ```bash
  docker stop propizza-test && docker rm propizza-test
  ```

---

## ☁️ Step 2: Push & Deploy to Google Cloud Run

Google Cloud offers **two pathways** to deploy this container to **Cloud Run**. Below is the easiest and most automated method using Google Cloud Build.

### Option A: Fully Automated Source-to-Deployment (Recommended)
This method builds the container securely in the cloud utilizing Google's secure serverless builder and deploys it immediately, requiring only one single line:

1. Authenticate your CLI with your Google account:
   ```bash
   gcloud auth login
   ```

2. Set your default Google Cloud Project ID (replace `YOUR_PROJECT_ID` with your actual GCP Project ID):
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. Enable the required Google APIs (Cloud Run, Artifact Registry, and Cloud Build):
   ```bash
   gcloud services enable run.googleapis.com \
                          containerregistry.googleapis.com \
                          cloudbuild.googleapis.com
   ```

4. Trigger the deployment directly from source:
   ```bash
   gcloud run deploy pro-pizza-website \
     --source . \
     --region europe-west1 \
     --allow-unauthenticated \
     --port 8080
   ```

* *Note: When prompted, select **`y`** to allow build configurations and allow public unauthenticated traffic.*
* Once completed, Google Cloud will output a public **`https://...`** URL pointing directly to your live, production-scale, automatic-SSL secured pizza platform in the cloud!

### Option B: Automatic Continuous Deployment (CD) via GitHub
If you have already created a Cloud Run service and want updates to deploy automatically whenever you push code (`git push`) to GitHub, configure Google's built-in CD trigger:

1. Go to the **[Google Cloud Console](https://console.cloud.google.com/)** and navigate to **Cloud Run**.
2. Click on your **existing service** (e.g., `pro-pizza-website`).
3. Inside the service dashboard, click **Set Up Continuous Deployment** (or **Edit & Deploy New Revision** -> Check *Set up continuous deployment* if building a new setup).
4. Select **GitHub** as your continuous deployment repository provider. (Authenticate with GitHub if prompted).
5. Choose your repository and branch (e.g., `main`).
6. In the build configuration:
   - Select **Dockerfile** as your deployment build method.
   - Enter standard `Dockerfile` in the source path box.
7. Click **Save**.

Google Cloud Build will automatically provision an asynchronous webhook. Whenever you push to your selected branch, Google Cloud will build your multi-stage Dockerfile and gracefully roll out a secure, zero-downtime revision update to your live website!

---
---

## ⚡ What Makes This Setup Perfect for Google Cloud?

- **Zero Cold-Starts Cost**: Because the build files are completely compiled ahead-of-time (static multi-stage build), the server container is incredibly small. Cloud Run will automatically scale down to zero containers when there is no traffic, costing you **$0.00** when nobody is ordering.
- **Robust Client routing**: If a user bookmarks `https://your-domain.com/menu` or manually refreshes a deep link, the container's production-hardened `express` engine automatically serves `index.html` as the fallback to let the React SPA router handle the view gracefully.
- **Ultra-Fast Cache Headers**: Common assets (such as CSS, Javascript, font bundles, and Pizza vector images) are served with `Cache-Control` long-term headers for instant loading speeds, while the primary document entry `index.html` is kept uncached to ensure users always see the latest products.
- **Built-in Security Headers**: Pre-configured with secure production headers (powered by `helmet`) to prevent cross-site scripting and resource hijacking threats.
