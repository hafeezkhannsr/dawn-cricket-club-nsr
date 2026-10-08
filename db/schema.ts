import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    role: text("role", {
      enum: ["SUPER_ADMIN", "CLUB_ADMIN", "REVIEWER", "FINANCE", "SCORER", "PLAYER"],
    })
      .notNull()
      .default("PLAYER"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
  },
  (t) => ({ emailIdx: uniqueIndex("users_email_idx").on(t.email) })
);
export const registrations = sqliteTable(
  "registrations",
  {
    id: text("id").primaryKey(),
    registrationNumber: text("registration_number").notNull(),
    program: text("program", { enum: ["DAWN", "DSL"] }).notNull(),
    registrationType: text("registration_type", { enum: ["PLAYER", "MEMBERSHIP"] }).notNull(),
    edition: integer("edition"),
    status: text("status", {
      enum: ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "NEEDS_CORRECTION", "APPROVED", "REJECTED"],
    })
      .notNull()
      .default("DRAFT"),
    paymentStatus: text("payment_status", {
      enum: ["UNPAID", "PROOF_SUBMITTED", "PENDING_VERIFICATION", "VERIFIED", "REJECTED", "REFUNDED"],
    })
      .notNull()
      .default("UNPAID"),
    feeAmount: integer("fee_amount").notNull(),
    currency: text("currency").notNull().default("PKR"),
    data: text("data", { mode: "json" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().defaultNow(),
  },
  (t) => ({
    regNumIdx: uniqueIndex("registrations_number_idx").on(t.registrationNumber),
  })
);
export const documents = sqliteTable("documents", {
  id: text("id").primaryKey(),
  registrationId: text("registration_id").notNull(),
  kind: text("kind", {
    enum: ["CNIC_FRONT", "CNIC_BACK", "B_FORM", "PORTRAIT", "PAYMENT_PROOF", "SIGNATURE"],
  }).notNull(),
  storageKey: text("storage_key").notNull(),
  mimeType: text("mime_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
});
export const auditEvents = sqliteTable("audit_events", {
  id: text("id").primaryKey(),
  actorId: text("actor_id"),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  before: text("before", { mode: "json" }),
  after: text("after", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
});
export type User = typeof users.$inferSelect;
export type Registration = typeof registrations.$inferSelect;
export type Document = typeof documents.$inferSelect;
