# Custom Domain Setup

This guide documents the active Cloudflare Pages custom domain:

https://java.casko.dev/

The existing Cloudflare Pages project is:

`d286-java-trainer`

## Add the Custom Domain

Current status: `java.casko.dev` is active and points to the `d286-java-trainer` Cloudflare Pages project. These steps document how it was added and how to re-create it if needed.

1. Go to the Cloudflare Dashboard.
2. Open **Workers & Pages**.
3. Select the **d286-java-trainer** Pages project.
4. Open **Custom domains**.
5. Select **Add custom domain**.
6. Enter:

   ```txt
   java.casko.dev
   ```

7. Confirm Cloudflare's DNS record creation.
8. Wait for the SSL/TLS certificate to finish provisioning.
9. Test:

   ```txt
   https://java.casko.dev
   ```

## Expected DNS Record

Cloudflare Pages usually creates the needed DNS record automatically when the zone is managed by Cloudflare. Confirm that `java.casko.dev` points to the Pages project in the Cloudflare DNS tab.

Do not add server code, authentication, or a database for this step. This app is a static Vite build deployed from the `dist` directory.

## Troubleshooting

### DNS Is Pending

- Confirm the `casko.dev` zone is active in Cloudflare.
- Confirm the `java` DNS record exists.
- Remove conflicting `A`, `AAAA`, or `CNAME` records for `java.casko.dev`.
- Wait a few minutes for Cloudflare to apply the record.

### SSL/TLS Certificate Is Pending

- Wait for certificate provisioning to complete. It can take several minutes.
- Confirm the custom domain status in **Workers & Pages -> d286-java-trainer -> Custom domains**.
- Confirm Cloudflare proxy/DNS settings are not conflicting with another record.
- Retry `https://java.casko.dev` after the certificate status becomes active.

### Blank Page After Domain Works

- Confirm the Pages build succeeded.
- Confirm the build output directory is `dist`.
- Confirm the app is using hash-based navigation, such as `https://java.casko.dev/#/daily-drill`.
- Hard refresh the browser to clear cached assets.

## Redeploy

After future changes are pushed to GitHub, Cloudflare Pages should automatically redeploy from the `main` branch.
