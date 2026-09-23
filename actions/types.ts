export type ActionResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      code:
        | "UNAUTHENTICATED"
        | "FORBIDDEN"
        | "INVALID_INPUT"
        | "CONFLICT"
        | "INTERNAL";
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
