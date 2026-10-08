"use client";
import FormField, { inputStyle } from "./FormField";
import Select from "@/components/ui/Select";
import FileUploadBox, { type UploadedFile } from "./FileUploadBox";
import {
  getProvinces, getDivisions, getDistricts, getTehsils,
  getUnionCouncils, getVillages, COUNTRIES,
} from "@/lib/geography";
import {
  calculateAge, suggestAgeCategory, listEditions, formatCnic, formatMobile, digitsOnly,
} from "@/lib/registration-utils";
import {
  PLAYING_ROLES, BATTING_STYLES, BOWLING_STYLES, BALL_TYPES,
  AGE_CATEGORIES, PLAYER_CATEGORIES, IDENTITY_TYPES, IDENTITY_LABELS,
  EDUCATION_LEVELS, feeFor,
} from "@/lib/registration-model";
type Props = {
  step?: number;
  data: Record<string, any>;
  update: (k: string, v: any) => void;
  errors: Record<string, string>;
};
export default function StepContent({ step, data, update, errors }: Props) {
  if (step === 1) return <Step1 data={data} update={update} errors={errors} />;
  if (step === 2) return <Step2 data={data} update={update} errors={errors} />;
  if (step === 3) return <Step3 data={data} update={update} errors={errors} />;
  if (step === 4) return <Step4 data={data} update={update} errors={errors} />;
  if (step === 5) return <Step5 data={data} update={update} errors={errors} />;
  if (step === 6) return <Step6 data={data} update={update} errors={errors} />;
  if (step === 7) return <Step7 data={data} update={update} errors={errors} />;
  if (step === 8) return <Step8 data={data} update={update} errors={errors} />;
  return <Step9 data={data} update={update} errors={errors} />;
}
const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".9rem" };
const gridStack: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr", gap: ".9rem" };
function RadioCard({
  active, onClick, title, desc,
}: { active: boolean; onClick: () => void; title: string; desc?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "1rem",
        borderRadius: ".7rem",
        border: active ? "1.5px solid #f0b429" : "1px solid rgba(255,255,255,.14)",
        background: active ? "rgba(240,180,41,.08)" : "rgba(255,255,255,.03)",
        color: "#eef4fb",
        cursor: "pointer",
        transition: "all .15s ease",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: ".95rem", color: active ? "#f0b429" : "#fff" }}>{title}</div>
      {desc && <div style={{ fontSize: ".78rem", color: "rgba(238,244,251,.65)", marginTop: ".25rem" }}>{desc}</div>}
    </button>
  );
}
/* ============== STEP 1: PROGRAM ============== */
function Step1({ data, update, errors }: Props) {
  const program = data.program;
  const regType = data.registrationType;
  const fee = program && regType ? feeFor(program, regType) : null;
  const editions = listEditions();
  const editionOptions = editions.map((e) => ({
    value: String(e.edition),
    label:
      e.status === "OPEN"
        ? `Edition ${e.edition} — ${e.year} · Registration Open`
        : `Edition ${e.edition} — ${e.year} · Locked until ${e.year}`,
    disabled: e.status !== "OPEN",
  }));
  return (
    <div style={gridStack}>
      <FormField label="Program" labelUr="پروگرام" required error={errors.program}>
        <div style={grid2}>
          <RadioCard active={program === "DAWN"} onClick={() => update("program", "DAWN")}
            title="DAWN Cricket Club" desc="Nowshera, KP · Full club registration" />
          <RadioCard active={program === "DSL"} onClick={() => update("program", "DSL")}
            title="DSL" desc="Edition-based seasonal league" />
        </div>
      </FormField>
      <FormField label="Registration Type" labelUr="رجسٹریشن کی قسم" required error={errors.registrationType}>
        <div style={grid2}>
          <RadioCard active={regType === "PLAYER"} onClick={() => update("registrationType", "PLAYER")}
            title="Player Registration" desc="For active players" />
          <RadioCard active={regType === "MEMBERSHIP"} onClick={() => update("registrationType", "MEMBERSHIP")}
            title="Membership" desc="Club membership only (DAWN)" />
        </div>
      </FormField>
      <FormField label="Player Category" labelUr="کھلاڑی کی قسم" required error={errors.playerCategory}
        hint="Local = resident of our area · Open = from anywhere · Guest = short-term · Rental/Shifting = temporarily residing">
        <Select
          value={data.playerCategory ?? ""}
          onChange={(v) => update("playerCategory", v)}
          options={PLAYER_CATEGORIES.map((c) => ({ value: c, label: c }))}
          placeholder="-- Select player category --"
        />
      </FormField>
      {program === "DSL" && (
        <FormField label="Edition" labelUr="ایڈیشن" required error={errors.edition}
          hint="Only next year's edition is open. Earlier editions are closed, later ones open automatically.">
          <Select
            value={data.edition ? String(data.edition) : ""}
            onChange={(v) => update("edition", v ? Number(v) : "")}
            options={editionOptions}
            placeholder="-- Select edition --"
          />
        </FormField>
      )}
      <FormField label="Age Category" labelUr="عمر کی قسم" required error={errors.ageCategory}>
        <Select
          value={data.ageCategory ?? ""}
          onChange={(v) => update("ageCategory", v)}
          options={AGE_CATEGORIES.map((c) => ({ value: c, label: c }))}
          placeholder="-- Auto from DOB (Step 2) --"
        />
      </FormField>
      {fee !== null && (
        <div style={{
          padding: "1rem", background: "rgba(20,164,77,.10)",
          border: "1px solid rgba(20,164,77,.35)", borderRadius: ".7rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: ".5rem",
        }}>
          <span style={{ fontSize: ".85rem", color: "rgba(238,244,251,.85)" }}>Registration Fee</span>
          <strong style={{ fontSize: "1.25rem", color: "#14a44d" }}>PKR {fee.toLocaleString()}</strong>
        </div>
      )}
    </div>
  );
}
/* ============== STEP 2: PERSONAL ============== */
function Step2({ data, update, errors }: Props) {
  const age = calculateAge(data.dateOfBirth);
  const suggested = suggestAgeCategory(age);
  return (
    <div style={gridStack}>
      <FormField label="Full Name" labelUr="پورا نام" required error={errors.fullNameEn}>
        <input style={inputStyle} value={data.fullNameEn ?? ""}
          onChange={(e) => update("fullNameEn", e.target.value)}
          placeholder="Muhammad Ahsan Khan" />
      </FormField>
      <FormField label="Father's Name" labelUr="والد کا نام" required error={errors.fatherName}>
        <input style={inputStyle} value={data.fatherName ?? ""}
          onChange={(e) => update("fatherName", e.target.value)}
          placeholder="Muhammad Ilyas" />
      </FormField>
      <div style={grid2}>
        <FormField label="Date of Birth" labelUr="تاریخِ پیدائش" required error={errors.dateOfBirth}
          hint={age !== null ? `Age: ${age} · Suggested: ${suggested}` : "Future dates are not allowed"}>
          <input type="date" style={inputStyle} max={new Date().toISOString().slice(0, 10)}
            value={data.dateOfBirth ?? ""}
            onChange={(e) => update("dateOfBirth", e.target.value)} />
        </FormField>
        <FormField label="Gender" labelUr="جنس" required error={errors.gender}>
          <Select value={data.gender ?? ""} onChange={(v) => update("gender", v)}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            placeholder="-- Select --" />
        </FormField>
      </div>
      <div style={grid2}>
        <FormField label="Nationality" labelUr="قومیت">
          <input style={inputStyle} value={data.nationality ?? "Pakistani"}
            onChange={(e) => update("nationality", e.target.value)} />
        </FormField>
        <FormField label="Religion (optional)" labelUr="مذہب">
          <Select value={data.religion ?? ""} onChange={(v) => update("religion", v)}
            options={["Islam", "Christianity", "Hinduism", "Sikhism", "Other"].map((r) => ({ value: r, label: r }))}
            placeholder="-- Optional --" />
        </FormField>
      </div>
      <div style={grid2}>
        <FormField label="Marital Status (optional)" labelUr="ازدواجی حیثیت">
          <Select value={data.maritalStatus ?? ""} onChange={(v) => update("maritalStatus", v)}
            options={[{ value: "Single", label: "Single" }, { value: "Married", label: "Married" }]}
            placeholder="-- Optional --" />
        </FormField>
        <FormField label="Blood Group (optional)" labelUr="بلڈ گروپ">
          <Select value={data.bloodGroup ?? ""} onChange={(v) => update("bloodGroup", v)}
            options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => ({ value: b, label: b }))}
            placeholder="-- Optional --" />
        </FormField>
      </div>
    </div>
  );
}
/* ============== STEP 3: CONTACT ============== */
function Step3({ data, update, errors }: Props) {
  return (
    <div style={gridStack}>
      <div style={grid2}>
        <FormField label="Primary Mobile" labelUr="موبائل نمبر" required error={errors.primaryMobile}
          hint="Format: 0300-1234567">
          <input style={inputStyle} inputMode="numeric" value={data.primaryMobile ?? ""}
            onChange={(e) => update("primaryMobile", formatMobile(digitsOnly(e.target.value)))}
            placeholder="0300-1234567" />
        </FormField>
        <FormField label="City" labelUr="شہر" required error={errors.residenceCity}>
          <input style={inputStyle} value={data.residenceCity ?? ""}
            onChange={(e) => update("residenceCity", e.target.value)}
            placeholder="Nowshera" />
        </FormField>
      </div>
      <FormField label="Email (optional)" labelUr="ای میل" error={errors.email}
        hint="For registration updates">
        <input type="email" style={inputStyle} value={data.email ?? ""}
          onChange={(e) => update("email", e.target.value)}
          placeholder="player@example.com" />
      </FormField>
    </div>
  );
}
/* ============== STEP 4: IDENTITY (with upload boxes) ============== */
function Step4({ data, update, errors }: Props) {
  const t = data.identityType as "CNIC" | "B_FORM" | "SMART_CARD" | undefined;
  const cnicFront = (data.cnicFront as UploadedFile | null) ?? null;
  const cnicBack = (data.cnicBack as UploadedFile | null) ?? null;
  const bFormFile = (data.bFormFile as UploadedFile | null) ?? null;
  const smartFront = (data.smartFront as UploadedFile | null) ?? null;
  const smartBack = (data.smartBack as UploadedFile | null) ?? null;
  return (
    <div style={gridStack}>
      <FormField label="Identity Type" labelUr="شناخت کی قسم" required error={errors.identityType}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: ".6rem" }}>
          {IDENTITY_TYPES.map((it) => (
            <RadioCard
              key={it}
              active={t === it}
              onClick={() => {
                update("identityType", it);
                update("identityNumber", "");
              }}
              title={IDENTITY_LABELS[it]}
              desc={
                it === "CNIC"
                  ? "Adults 18+ · Upload front & back"
                  : it === "B_FORM"
                  ? "Under-18 players · One document"
                  : "New digital ID card · Upload front & back"
              }
            />
          ))}
        </div>
      </FormField>
      {t && (
        <FormField
          label={`${IDENTITY_LABELS[t as keyof typeof IDENTITY_LABELS]} Number`}
          labelUr="نمبر"
          required
          error={errors.identityNumber}
          hint="13 digits. Dashes are added automatically."
        >
          <input
            style={inputStyle}
            inputMode="numeric"
            value={data.identityNumber ?? ""}
            onChange={(e) => update("identityNumber", formatCnic(e.target.value))}
            placeholder="12345-1234567-1"
          />
        </FormField>
      )}
      {t === "CNIC" && (
        <div style={grid2}>
          <FileUploadBox
            label="CNIC Front"
            labelUr="شناختی کارڈ سامنے"
            required
            value={cnicFront}
            onChange={(f) => update("cnicFront", f)}
            hint="Clear photo of the front side"
          />
          <FileUploadBox
            label="CNIC Back"
            labelUr="شناختی کارڈ پیچھے"
            required
            value={cnicBack}
            onChange={(f) => update("cnicBack", f)}
            hint="Clear photo of the back side"
          />
        </div>
      )}
      {t === "B_FORM" && (
        <FileUploadBox
          label="B-Form Document"
          labelUr="ب فارم"
          required
          value={bFormFile}
          onChange={(f) => update("bFormFile", f)}
          hint="Single clear photo or scan of the full B-Form"
        />
      )}
      {t === "SMART_CARD" && (
        <div style={grid2}>
          <FileUploadBox
            label="Smart Card Front"
            labelUr="سمارٹ کارڈ سامنے"
            required
            value={smartFront}
            onChange={(f) => update("smartFront", f)}
            hint="Front side of the smart card"
          />
          <FileUploadBox
            label="Smart Card Back"
            labelUr="سمارٹ کارڈ پیچھے"
            required
            value={smartBack}
            onChange={(f) => update("smartBack", f)}
            hint="Back side of the smart card"
          />
        </div>
      )}
      <FormField label="Player Portrait Photo" labelUr="کھلاڑی کی تصویر" required error={errors.portrait}
        hint="Front-facing photo of the player — clear background preferred">
        <FileUploadBox
          label="Portrait Photo"
          labelUr="تصویر"
          required
          value={(data.portrait as UploadedFile | null) ?? null}
          onChange={(f) => update("portrait", f)}
          accept="image/jpeg,image/png,image/webp"
          hint="JPG, PNG or WebP · max 3 MB"
        />
      </FormField>
      <div style={{
        padding: ".9rem 1rem",
        background: "rgba(240,180,41,.08)",
        border: "1px solid rgba(240,180,41,.28)",
        borderRadius: ".6rem",
        fontSize: ".8rem",
        color: "rgba(238,244,251,.85)",
        lineHeight: 1.5,
      }}>
        Your documents are kept private and are only used for verification by authorized administrators.
      </div>
    </div>
  );
}
/* ============== STEP 5: ADDRESS ============== */
function Step5({ data, update, errors }: Props) {
  const country = data.country ?? "PK";
  const province = data.province ?? "";
  const division = data.division ?? "";
  const district = data.district ?? "";
  const tehsil = data.tehsil ?? "";
  const uc = data.unionCouncil ?? "";
  const provinces = getProvinces();
  const divisions = province ? getDivisions(province) : [];
  const districts = province && division ? getDistricts(province, division) : [];
  const tehsils = province && division && district ? getTehsils(province, division, district) : [];
  const ucs = province && division && district && tehsil
    ? getUnionCouncils(province, division, district, tehsil) : [];
  const villages = province && division && district && tehsil && uc
    ? getVillages(province, division, district, tehsil, uc) : [];
  return (
    <div style={gridStack}>
      <FormField label="Country" labelUr="ملک" required error={errors.country}>
        <Select value={country} onChange={(v) => update("country", v)}
          options={COUNTRIES.map((c) => ({ value: c.code, label: c.name }))} />
      </FormField>
      {country === "PK" && (
        <>
          <FormField label="Province / Territory" labelUr="صوبہ" required error={errors.province}>
            <Select value={province} onChange={(v) => {
              update("province", v); update("division", ""); update("district", "");
              update("tehsil", ""); update("unionCouncil", ""); update("village", "");
            }} options={provinces.map((p) => ({ value: p.id, label: p.name }))}
              placeholder="-- Select province --" />
          </FormField>
          {divisions.length > 0 && (
            <FormField label="Division" labelUr="ڈویژن" required error={errors.division}>
              <Select value={division} onChange={(v) => {
                update("division", v); update("district", ""); update("tehsil", "");
                update("unionCouncil", ""); update("village", "");
              }} options={divisions.map((d) => ({ value: d.id, label: d.name }))}
                placeholder="-- Select division --" />
            </FormField>
          )}
          {districts.length > 0 && (
            <FormField label="District" labelUr="ضلع" required error={errors.district}>
              <Select value={district} onChange={(v) => {
                update("district", v); update("tehsil", ""); update("unionCouncil", ""); update("village", "");
              }} options={districts.map((d) => ({ value: d.id, label: d.name }))}
                placeholder="-- Select district --" />
            </FormField>
          )}
          {tehsils.length > 0 && (
            <FormField label="Tehsil" labelUr="تحصیل" required error={errors.tehsil}>
              <Select value={tehsil} onChange={(v) => {
                update("tehsil", v); update("unionCouncil", ""); update("village", "");
              }} options={tehsils.map((t) => ({ value: t.id, label: t.name }))}
                placeholder="-- Select tehsil --" />
            </FormField>
          )}
          {ucs.length > 0 && (
            <FormField label="Union Council (UC)" labelUr="یونین کونسل" required error={errors.unionCouncil}>
              <Select value={uc} onChange={(v) => {
                update("unionCouncil", v); update("village", "");
              }} options={ucs.map((u) => ({ value: u.id, label: u.name }))}
                placeholder="-- Select Union Council --" />
            </FormField>
          )}
          {villages.length > 0 && (
            <FormField label="Village / Locality (VC)" labelUr="گاؤں / بستی" required error={errors.village}>
              <Select value={data.village ?? ""} onChange={(v) => update("village", v)}
                options={villages.map((v) => ({ value: v, label: v }))}
                placeholder="-- Select village / locality --" />
            </FormField>
          )}
        </>
      )}
      <FormField label="Full Postal Address" labelUr="مکمل پتہ" required error={errors.postalAddress}
        hint="House / Street / Mohallah — as it appears on your documents">
        <textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
          value={data.postalAddress ?? ""}
          onChange={(e) => update("postalAddress", e.target.value)}
          placeholder="House #, Street, Mohallah" />
      </FormField>
    </div>
  );
}
/* ============== STEP 6: CRICKET ============== */
function Step6({ data, update, errors }: Props) {
  return (
    <div style={gridStack}>
      <div style={grid2}>
        <FormField label="Playing Role" labelUr="کھیل کا کردار" required error={errors.playingRole}>
          <Select value={data.playingRole ?? ""} onChange={(v) => update("playingRole", v)}
            options={PLAYING_ROLES.map((r) => ({ value: r, label: r }))} placeholder="-- Select --" />
        </FormField>
        <FormField label="Batting Style" labelUr="بیٹنگ اسٹائل" required error={errors.battingStyle}>
          <Select value={data.battingStyle ?? ""} onChange={(v) => update("battingStyle", v)}
            options={BATTING_STYLES.map((r) => ({ value: r, label: r }))} placeholder="-- Select --" />
        </FormField>
      </div>
      <div style={grid2}>
        <FormField label="Bowling Style" labelUr="بولنگ اسٹائل" required error={errors.bowlingStyle}>
          <Select value={data.bowlingStyle ?? ""} onChange={(v) => update("bowlingStyle", v)}
            options={BOWLING_STYLES.map((r) => ({ value: r, label: r }))} placeholder="-- Select --" />
        </FormField>
        <FormField label="Ball Type" labelUr="بال کی قسم" required error={errors.ballType}>
          <Select value={data.ballType ?? ""} onChange={(v) => update("ballType", v)}
            options={BALL_TYPES.map((r) => ({ value: r, label: r }))} placeholder="-- Select --" />
        </FormField>
      </div>
      <div style={grid2}>
        <FormField label="Experience (years)" labelUr="تجربہ (سال)" required error={errors.experienceYears}>
          <input type="number" min={0} max={50} style={inputStyle}
            value={data.experienceYears ?? ""}
            onChange={(e) => update("experienceYears", Number(e.target.value))} placeholder="0" />
        </FormField>
        <FormField label="Previous Club (optional)" labelUr="سابقہ کلب">
          <input style={inputStyle} value={data.previousClub ?? ""}
            onChange={(e) => update("previousClub", e.target.value)}
            placeholder="e.g. Young Stars CC" />
        </FormField>
      </div>
    </div>
  );
}
/* ============== STEP 7: EDUCATION ============== */
function Step7({ data, update, errors }: Props) {
  const isStudent = data.isStudent === true;
  return (
    <div style={gridStack}>
      <FormField label="Currently a student?" labelUr="کیا آپ طالبِ علم ہیں؟" required>
        <div style={grid2}>
          <RadioCard active={isStudent} onClick={() => update("isStudent", true)}
            title="Yes" desc="School / College / University" />
          <RadioCard active={data.isStudent === false} onClick={() => update("isStudent", false)}
            title="No" desc="Not currently studying" />
        </div>
      </FormField>
      <FormField label="Education Level" labelUr="تعلیمی سطح" required error={errors.educationLevel}>
        <Select value={data.educationLevel ?? ""} onChange={(v) => update("educationLevel", v)}
          options={EDUCATION_LEVELS.map((e) => ({ value: e, label: e }))}
          placeholder="-- Select education level --" />
      </FormField>
      {isStudent && (
        <FormField label="School / Institute Name (optional)" labelUr="تعلیمی ادارہ" error={errors.schoolName}>
          <input style={inputStyle} value={data.schoolName ?? ""}
            onChange={(e) => update("schoolName", e.target.value)}
            placeholder="Government High School Nowshera" />
        </FormField>
      )}
      <FormField label="Availability" labelUr="دستیابی" required error={errors.availability}
        hint="e.g. Weekends, Evenings after 4pm, Full-time, Match days only">
        <input style={inputStyle} value={data.availability ?? ""}
          onChange={(e) => update("availability", e.target.value)}
          placeholder="Weekends & evenings" />
      </FormField>
    </div>
  );
}
/* ============== STEP 8: GUARDIAN ============== */
function Step8({ data, update, errors }: Props) {
  return (
    <div style={gridStack}>
      <div style={grid2}>
        <FormField label="Guardian Name" labelUr="سرپرست کا نام" required error={errors.guardianName}>
          <input style={inputStyle} value={data.guardianName ?? ""}
            onChange={(e) => update("guardianName", e.target.value)}
            placeholder="Muhammad Ilyas" />
        </FormField>
        <FormField label="Relation" labelUr="رشتہ" required error={errors.guardianRelation}>
          <Select value={data.guardianRelation ?? ""} onChange={(v) => update("guardianRelation", v)}
            options={["Father", "Mother", "Brother", "Uncle", "Guardian", "Other"].map((r) => ({ value: r, label: r }))}
            placeholder="-- Select --" />
        </FormField>
      </div>
      <FormField label="Guardian Mobile" labelUr="سرپرست کا موبائل" required error={errors.guardianMobile}>
        <input style={inputStyle} inputMode="numeric" value={data.guardianMobile ?? ""}
          onChange={(e) => update("guardianMobile", formatMobile(digitsOnly(e.target.value)))}
          placeholder="0300-1234567" />
      </FormField>
      <label style={{
        display: "flex", gap: ".7rem", alignItems: "flex-start",
        padding: "1rem", borderRadius: ".7rem",
        border: "1px solid rgba(255,255,255,.14)",
        background: "rgba(255,255,255,.03)", cursor: "pointer",
      }}>
        <input type="checkbox" checked={!!data.rulesConsent}
          onChange={(e) => update("rulesConsent", e.target.checked)}
          style={{ marginTop: ".15rem", accentColor: "#f0b429", width: 18, height: 18 }} />
        <span style={{ fontSize: ".85rem", lineHeight: 1.5, color: "rgba(238,244,251,.9)" }}>
          I confirm all information is accurate, and I agree to follow the club rules,
          code of conduct and privacy policy of DAWN Cricket Club.
          {errors.rulesConsent && <><br /><span style={{ color: "#ff8b8b", fontSize: ".78rem" }}>{errors.rulesConsent}</span></>}
        </span>
      </label>
      <label style={{
        display: "flex", gap: ".7rem", alignItems: "flex-start",
        padding: "1rem", borderRadius: ".7rem",
        border: "1px solid rgba(255,255,255,.14)",
        background: "rgba(255,255,255,.03)", cursor: "pointer",
      }}>
        <input type="checkbox" checked={!!data.publicPhotoConsent}
          onChange={(e) => update("publicPhotoConsent", e.target.checked)}
          style={{ marginTop: ".15rem", accentColor: "#f0b429", width: 18, height: 18 }} />
        <span style={{ fontSize: ".85rem", lineHeight: 1.5, color: "rgba(238,244,251,.9)" }}>
          I allow DAWN Cricket Club to publish my name and photo on the club website
          for player recognition and statistics. (Optional)
        </span>
      </label>
    </div>
  );
}
/* ============== STEP 9: PAYMENT ============== */
function Step9({ data, update, errors }: Props) {
  const fee = feeFor(data.program || "DAWN", data.registrationType || "PLAYER");
  return (
    <div style={gridStack}>
      <div style={{
        padding: "1.1rem 1.25rem",
        background: "rgba(240,180,41,.08)",
        border: "1px solid rgba(240,180,41,.32)",
        borderRadius: ".7rem",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: ".5rem" }}>
          <span style={{ fontSize: ".85rem", color: "rgba(238,244,251,.85)" }}>Total Payable</span>
          <strong style={{ fontSize: "1.6rem", color: "#f0b429" }}>PKR {fee.toLocaleString()}</strong>
        </div>
        <p style={{ fontSize: ".78rem", color: "rgba(238,244,251,.7)", marginTop: ".5rem", lineHeight: 1.5 }}>
          Bank / wallet account details will be shared after admin approval of your submission.
        </p>
      </div>
      <FormField label="Payment Method" labelUr="ادائیگی کا طریقہ" required error={errors.paymentMethod}>
        <Select value={data.paymentMethod ?? ""} onChange={(v) => update("paymentMethod", v)}
          options={["Bank Transfer", "JazzCash", "EasyPaisa", "Cash (in-person)"].map((m) => ({ value: m, label: m }))}
          placeholder="-- Select --" />
      </FormField>
      <div style={grid2}>
        <FormField label="Payment Date" labelUr="ادائیگی کی تاریخ" required error={errors.paymentDate}>
          <input type="date" style={inputStyle} value={data.paymentDate ?? ""}
            onChange={(e) => update("paymentDate", e.target.value)} />
        </FormField>
        <FormField label="Transaction / Reference #" labelUr="ٹرانزیکشن نمبر" required error={errors.transactionReference}>
          <input style={inputStyle} value={data.transactionReference ?? ""}
            onChange={(e) => update("transactionReference", e.target.value)}
            placeholder="e.g. TXN-123456" />
        </FormField>
      </div>
      <FormField label="Full Name (as signature)" labelUr="دستخط (پورا نام)" required error={errors.signatureName}
        hint="Typing your name acts as a digital acknowledgment.">
        <input style={inputStyle} value={data.signatureName ?? ""}
          onChange={(e) => update("signatureName", e.target.value)}
          placeholder="Muhammad Ahsan Khan" />
      </FormField>
    </div>
  );
}