# TanStack Start Minimal Project - Bug Reproduction

## DESCRIPTION
This project demonstrates a bug in the handling of environment variables and secrets in a TanStack Start Minimal Project using Cloudflare Workers. The bug occurs when the "secrets" field is defined in "/wrangler.jsonc", causing the value of "MY_VARIABLE_A" to be overridden by the value in "/wrangler.jsonc" instead of using the value from ".dev.vars" during local development.

## Bug Reproduction Steps

### SETUP
1. Add "MY_VARIABLE_A" environment variable to "/wrangler.jsonc" with value "100900"
2. Add "MY_VARIABLE_A" environment variable to ".dev.vars" with value "900"
2. Add "MY_SECRET" environment variable to ".dev.vars" with value "yummy-rainbow-donut"

### CONTROL
3. Check "secrets" is not defined in "/wrangler.jsonc"
4. Start localhost using Cloudflare Vite plugin "pnpm run dev". Observe in log in terminal returns:
```
[Client] src/routes/index.tsx:22:3 Client-side received variable A: 900
[Client] src/routes/index.tsx:23:3 Client-side received my secret: yummy-rainbow-donut
```
### TEST
5. Add "secrets" in "/wrangler.jsonc"
```
{
  ...
  "secrets": {
		"required": ["MY_SECRET"]
	}
  ...
}
```
6. Start localhost using Cloudflare Vite plugin "pnpm run dev". Observe in log in terminal returns:
```
[Client] src/routes/index.tsx:22:3 Client-side received variable A: 100900
[Client] src/routes/index.tsx:23:3 Client-side received my secret: yummy-rainbow-donut
```
### EXPECTED
- The value of "MY_VARIABLE_A" should be "900" in both cases, since the ".dev.vars" file is used for local development and should override the value in "/wrangler.jsonc". The value of "MY_SECRET" should be "yummy-rainbow-donut" in both cases, since it is only defined in ".dev.vars" and should be available for local development.

### ACTUAL
- The value of "MY_VARIABLE_A" is "900" when "secrets" is not defined in "/wrangler.jsonc", but it changes to "100900" when "secrets" is defined in "/wrangler.jsonc". The value of "MY_SECRET" remains "yummy-rainbow-donut" in both cases, as expected.
