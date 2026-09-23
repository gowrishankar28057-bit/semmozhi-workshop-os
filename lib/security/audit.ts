export type AuditEvent = {
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export interface AuditWriter {
  write(event: AuditEvent): Promise<void>;
}

export function redactAuditMetadata(metadata: AuditEvent["metadata"]) {
  if (!metadata) return undefined;
  const forbidden = /password|secret|token|key/i;
  return Object.fromEntries(
    Object.entries(metadata).filter(([key]) => !forbidden.test(key)),
  );
}
