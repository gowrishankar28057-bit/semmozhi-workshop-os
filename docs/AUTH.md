# Authentication

Auth.js will establish signed server sessions and map the persisted user role to `AuthPrincipal`. Provider/account/session models are added when provider selection is finalized. Login and registration require server-side Turnstile verification. Passwords, if credentials auth is selected, require a memory-hard password hash and throttled reset flow. Route middleware improves navigation, but every action/handler independently calls role/permission guards.
