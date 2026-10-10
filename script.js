/*
 * DAWN Cricket Club — player registration form.
 * Static GitHub Pages demo: no server submission or persistent storage.
 * The locationData object is a starter dataset only; replace with a verified
 * official Pakistan administrative dataset before production use.
 */
const locationData = {
  "Khyber Pakhtunkhwa": {
    "Peshawar": {
      "Peshawar": { "tehsils": { "Peshawar City": { "ucs": ["Shahi Bala", "Hazar Khwani (sample)"], "villages": ["Example Village (replace with verified data)"] }, "Peshawar Saddar": { "ucs": ["Saddar (sample)"], "villages": ["Example Neighbourhood (replace with verified data)"] } } },
      "Nowshera": { "tehsils": { "Nowshera": { "ucs": ["Nowshera Kalan (sample)", "Hakimabad area (verify UC)"], "villages": ["Hakimabad (verify local council mapping)", "Dheri Katti Khel (verify local council mapping)"] }, "Pabbi": { "ucs": ["Pabbi (sample)"], "villages": ["Example Village (replace with verified data)"] }, "Jehangira": { "ucs": ["Jehangira (sample)"], "villages": ["Example Village (replace with verified data)"] } } },
      "Charsadda": { "tehsils": { "Charsadda": { "ucs": ["Charsadda (sample)"], "villages": ["Example Village (replace with verified data)"] }, "Tangi": { "ucs": ["Tangi (sample)"], "villages": ["Example Village (replace with verified data)"] } }
    },
    "Mardan": {
      "Mardan": { "tehsils": { "Mardan": { "ucs": ["Mardan (sample)"], "villages": ["Example Village (replace with verified data)"] }, "Takht Bhai": { "ucs": ["Takht Bhai (sample)"], "villages": ["Example Village (replace with verified data)"] } } },
      "Swabi": { "tehsils": { "Swabi": { "ucs": ["Swabi (sample)"], "villages": ["Example Village (replace with verified data)"] }, "Topi": { "ucs": ["Topi (sample)"], "villages": ["Example Village (replace with verified data)"] } } }
    },
    "Hazara": {
      "Abbottabad": { "tehsils": { "Abbottabad": { "ucs": ["Abbottabad (sample)"], "villages": ["Example Village (replace with verified data)"] }, "Havelian": { "ucs": ["Havelian (sample)"], "villages": ["Example Village (replace with verified data)"] } } },
      "Mansehra": { "tehsils": { "Mansehra": { "ucs": ["Mansehra (sample)"], "villages": ["Example Village (replace with verified data)"] }, "Oghi": { "ucs": ["Oghi (sample)"], "villages": ["Example Village (replace with verified data)"] } } }
    },
    "Kohat": { "Kohat": { "tehsils": { "Kohat": { "ucs": ["Kohat (sample)"], "villages": ["Example Village (replace with verified data)"] } } } },
    "Bannu": { "Bannu": { "tehsils": { "Bannu": { "ucs": ["Bannu (sample)"], "villages": ["Example Village (replace with verified data)"] } } } },
    "Dera Ismail Khan": { "Dera Ismail Khan": { "tehsils": { "Dera Ismail Khan": { "ucs": ["D.I. Khan (sample)"], "villages": ["Example Village (replace with verified data)"] } } } },
    "Malakand": { "Swat": { "tehsils": { "Babuzai": { "ucs": ["Babuzai (sample)"], "villages": ["Example Village (replace with verified data)"] }, "Kabal": { "ucs": ["Kabal (sample)"], "villages": ["Example Village (replace with verified data)"] } } } }
  },
  "Punjab": {
    "Lahore": { "Lahore": { "tehsils": { "Lahore City": { "ucs": ["Lahore UC (sample)"], "villages": ["Example locality (replace with verified data)"] } } }, "Kasur": { "tehsils": { "Kasur": { "ucs": ["Kasur (sample)"], "villages": ["Example Village (replace with verified data)"] } } } },
    "Rawalpindi": { "Rawalpindi": { "tehsils": { "Rawalpindi": { "ucs": ["Rawalpindi (sample)"], "villages": ["Example locality (replace with verified data)"] } } }, "Attock": { "tehsils": { "Attock": { "ucs": ["Attock (sample)"], "villages": ["Example Village (replace with verified data)"] } } } },
    "Faisalabad": { "Faisalabad": { "tehsils": { "Faisalabad City": { "ucs": ["Faisalabad (sample)"], "villages": ["Example locality (replace with verified data)"] } } } }
  },
  "Sindh": {
    "Karachi": { "Karachi East": { "tehsils": { "Gulshan-e-Iqbal": { "ucs": ["Gulshan (sample)"], "villages": ["Example locality (replace with verified data)"] } } }, "Hyderabad": { "tehsils": { "Hyderabad City": { "ucs": ["Hyderabad (sample)"], "villages": ["Example locality (replace with verified data)"] } } } }
  },
  "Balochistan": {
    "Quetta": { "Quetta": { "tehsils": { "Quetta City": { "ucs": ["Quetta (sample)"], "villages": ["Example Village (replace with verified data)"] } } } },
    "Kalat": { "Kalat": { "tehsils": { "Kalat": { "ucs": ["Kalat (sample)"], "villages": ["Example Village (replace with verified data)"] } } } }
  },
  "Islamabad Capital Territory": {
    "Islamabad": { "Islamabad": { "tehsils": { "Islamabad": { "ucs": ["Islamabad UC (sample)"], "villages": ["Example locality (replace with verified data)"] } } } }
  },
  "Azad Jammu & Kashmir": {
    "Muzaffarabad": { "Muzaffarabad": { "tehsils": { "Muzaffarabad": { "ucs": ["Muzaffarabad (sample)"], "villages": ["Example Village (replace with verified data)"] } } } }
  },
  "Gilgit-Baltistan": {
    "Gilgit": { "Gilgit": { "tehsils": { "Gilgit": { "ucs": ["Gilgit (sample)"], "villages": ["Example Village (replace with verified data)"] } } } }
  }
};

const $ = (s) => document.querySelector(s);
const form = $("#registrationForm");
const province = $("#province"), division = $("#division"), district = $("#district");
const tehsil = $("#tehsil"), uc = $("#uc"), village = $("#village");
const locationSelects = [province, division, district, tehsil, uc, village];

function options(select, values, placeholder) {
  select.innerHTML = "";
  const first = document.createElement("option");
  first.value = ""; first.textContent = placeholder; select.appendChild(first);
  values.forEach(value => {
    const opt = document.createElement("option");
    opt.value = value; opt.textContent = value; select.appendChild(opt);
  });
  select.disabled = values.length === 0;
}
function resetAfter(index) {
  const placeholders = ["Select province / territory", "Select division", "Select district", "Select tehsil", "Select union council", "Select village / neighbourhood"];
  for (let i = index + 1; i < locationSelects.length; i++) options(locationSelects[i], [], placeholders[i]);
}
options(province, Object.keys(locationData), "Select province / territory");
province.addEventListener("change", () => {
  options(division, Object.keys(locationData[province.value] || {}), "Select division");
  resetAfter(1);
});
division.addEventListener("change", () => {
  options(district, Object.keys(locationData[province.value]?.[division.value] || {}), "Select district");
  resetAfter(2);
});
district.addEventListener("change", () => {
  const data = locationData[province.value]?.[division.value]?.[district.value];
  options(tehsil, Object.keys(data?.tehsils || {}), "Select tehsil");
  resetAfter(3);
});
tehsil.addEventListener("change", () => {
  const data = locationData[province.value]?.[division.value]?.[district.value]?.tehsils?.[tehsil.value];
  options(uc, data?.ucs || [], "Select union council");
  options(village, [], "Select village / neighbourhood");
});
uc.addEventListener("change", () => {
  const data = locationData[province.value]?.[division.value]?.[district.value]?.tehsils?.[tehsil.value];
  options(village, data?.villages || [], "Select village / neighbourhood");
});

document.querySelectorAll('input[name="fullName"], input[name="guardianName"], input[name="birthPlace"], input[name="previousClub"], input[name="address"]').forEach(input => {
  input.addEventListener("input", () => {
    const start = input.selectionStart, end = input.selectionEnd;
    input.value = input.value.toLocaleUpperCase("en");
    try { input.setSelectionRange(start, end); } catch (_) {}
  });
});
$("#identity").addEventListener("input", e => {
  const digits = e.target.value.replace(/\D/g, "").slice(0, 13);
  e.target.value = digits.length > 12 ? `${digits.slice(0,5)}-${digits.slice(5,12)}-${digits.slice(12)}` :
    digits.length > 5 ? `${digits.slice(0,5)}-${digits.slice(5)}` : digits;
});

const photoInput = $("#playerPhoto"), photoPreview = $("#photoPreview");
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    photoInput.value = "";
    $("#status").textContent = "Photo is larger than 2 MB. Please choose a smaller image.";
    return;
  }
  if (!file.type.startsWith("image/")) {
    photoInput.value = "";
    $("#status").textContent = "Please select an image file.";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    photoPreview.style.backgroundImage = `linear-gradient(#001c1c22,#001c1c22),url("${reader.result}")`;
    photoPreview.innerHTML = '<strong class="photo-overlay">PHOTO PREVIEW</strong>';
  };
  reader.readAsDataURL(file);
});

const dialog = $("#reviewDialog");
function selectedText(name) {
  const el = form.elements[name];
  if (!el) return "";
  if (el instanceof HTMLSelectElement) return el.selectedOptions[0]?.textContent || "";
  if (el.type === "file") return el.files[0]?.name || "";
  if (el.type === "checkbox") return el.checked ? "Confirmed" : "Not confirmed";
  return el.value.trim();
}
const reviewFields = [
  ["Full Name","fullName"],["Father / Guardian","guardianName"],["CNIC / B-Form","identity"],
  ["Date of Birth","dob"],["Email","email"],["Mobile (+92)","phone"],["Gender","gender"],
  ["Province / Territory","province"],["Division","division"],["District","district"],
  ["Tehsil","tehsil"],["Union Council","uc"],["Village / Neighbourhood","village"],
  ["Player Role","role"],["Batting Style","batting"],["Bowling Style","bowling"],["Address","address"]
];
form.addEventListener("submit", e => {
  e.preventDefault();
  const dob = new Date(form.elements.dob.value);
  if (Number.isNaN(dob.getTime()) || dob > new Date()) {
    $("#status").textContent = "Please enter a valid date of birth.";
    return;
  }
  if (!form.reportValidity()) return;
  const content = $("#reviewContent");
  content.innerHTML = "";
  const grid = document.createElement("div"); grid.className = "review-grid";
  reviewFields.forEach(([label, name]) => {
    const item = document.createElement("div"); item.className = "review-item";
    const small = document.createElement("small"); small.textContent = label;
    const strong = document.createElement("strong"); strong.textContent = selectedText(name) || "—";
    item.append(small, strong); grid.appendChild(item);
  });
  content.appendChild(grid);
  dialog.showModal();
});
$("#editBtn").addEventListener("click", () => dialog.close());
$("#downloadBtn").addEventListener("click", () => {
  const rows = reviewFields.map(([label, name]) => `${label}: ${selectedText(name) || "—"}`);
  rows.push(`Player Photo: ${photoInput.files[0]?.name || "—"}`);
  rows.push("", "DEMO SUMMARY ONLY — this is not an official registration confirmation.");
  const blob = new Blob([`DAWN CRICKET CLUB (DKK)\nPLAYER REGISTRATION SUMMARY\n\n${rows.join("\n")}\n`], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "DKK-player-registration-summary.txt"; a.click();
  URL.revokeObjectURL(url);
});
form.addEventListener("reset", () => {
  setTimeout(() => {
    options(division, [], "Select division"); resetAfter(1);
    photoPreview.style.backgroundImage = "";
    photoPreview.innerHTML = '<span class="camera" aria-hidden="true">◎</span><strong>PLAYER PHOTO</strong><span>Upload a recent, clear photo</span>';
    $("#status").textContent = "Required fields are marked with *.";
  }, 0);
});
