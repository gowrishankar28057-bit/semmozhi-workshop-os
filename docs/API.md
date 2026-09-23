# API and action map

| Area                              | Boundary                                | Auth                                      | Status      |
| --------------------------------- | --------------------------------------- | ----------------------------------------- | ----------- |
| Health                            | `GET /api/health` → `{status,database}` | Public                                    | IMPLEMENTED |
| Auth                              | Auth.js handlers/actions                | Public/session                            | SCAFFOLDED  |
| Organizers                        | create/list/status actions              | ADMIN                                     | SCAFFOLDED  |
| Workshops/sessions                | CRUD/publish actions and reads          | ORGANIZER owner; public published reads   | SCAFFOLDED  |
| Registrations                     | register/cancel/read own                | PARTICIPANT                               | SCAFFOLDED  |
| Attendance/QR                     | open, token, check-in, modify           | ORGANIZER owner / registered PARTICIPANT  | SCAFFOLDED  |
| Certificates                      | issue/download/verify                   | ORGANIZER owner / subject / public verify | SCAFFOLDED  |
| Announcements/resources/community | CRUD and participation                  | scoped by role and ownership              | PLANNED     |
| Notifications/analytics           | list, mark read, aggregate              | own or role scope                         | PLANNED     |

Mutations accept Zod-validated JSON/form inputs and return typed success data or safe 400/401/403/404/409 errors. Internal exception details and connection metadata are never returned.
