# RBAC

ADMIN manages organizers and platform oversight. ORGANIZER manages only workshops owned by its organizer profile and their sessions, registrations, attendance, announcements, resources, community, certificates, and analytics. PARTICIPANT discovers/registers, accesses own workshops and records, joins eligible communities, and views own certificates/passport. `canManageWorkshop` encodes the tenant boundary; services must load ownership from the database rather than accept it from clients. Sensitive role/status changes create audit events.
