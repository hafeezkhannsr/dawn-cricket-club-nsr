export type UnionCouncil = { id: string; name: string; villages: string[] };
export type Tehsil = { id: string; name: string; unionCouncils: UnionCouncil[] };
export type District = { id: string; name: string; tehsils: Tehsil[] };
export type Division = { id: string; name: string; districts: District[] };
export type Province = { id: string; name: string; divisions: Division[] };
const GEO_DATA: { provinces: Province[] } = {
  provinces: [
    {
      id: "KP", name: "Khyber Pakhtunkhwa",
      divisions: [
        {
          id: "PESHAWAR", name: "Peshawar",
          districts: [
            {
              id: "NOWSHERA", name: "Nowshera",
              tehsils: [
                { id: "NOWSHERA_TEHSIL", name: "Nowshera", unionCouncils: [
                  { id: "UC_NOWSHERA_1", name: "Nowshera-1 (City)", villages: ["Dheri Katti Khel", "Hakeemabad", "Qamar Khel", "Ammar Colony"] },
                  { id: "UC_NOWSHERA_2", name: "Nowshera-2 (Kalan)", villages: ["Nowshera Kalan", "Manki Sharif"] },
                  { id: "UC_RISALPUR", name: "Risalpur", villages: ["Risalpur", "Risalpur Cantt"] },
                  { id: "UC_PIR_SABAQ", name: "Pir Sabaq", villages: ["Pir Sabaq", "Ziarat Kaka Sahib"] }
                ]},
                { id: "PABBI", name: "Pabbi", unionCouncils: [
                  { id: "UC_PABBI", name: "Pabbi", villages: ["Pabbi", "Dagai", "Tarnab", "Choki Mamraiz"] },
                  { id: "UC_AMANGARH", name: "Amangarh", villages: ["Amangarh", "Pabbi Rural"] }
                ]},
                { id: "AKORA", name: "Akora Khattak", unionCouncils: [
                  { id: "UC_AKORA", name: "Akora Khattak", villages: ["Akora Khattak", "Khushal Garh", "Jehangira"] },
                  { id: "UC_KHATTAK", name: "Khattak", villages: ["Khattak", "Khairabad"] }
                ]}
              ]
            },
            { id: "PESHAWAR", name: "Peshawar", tehsils: [
              { id: "PESHAWAR_CITY", name: "Peshawar City", unionCouncils: [] }
            ]}
          ]
        },
        { id: "MARDAN", name: "Mardan", districts: [
          { id: "MARDAN", name: "Mardan", tehsils: [{ id: "MARDAN_T", name: "Mardan", unionCouncils: [] }] }
        ]}
      ]
    },
    { id: "PB", name: "Punjab", divisions: [
      { id: "LAHORE", name: "Lahore", districts: [
        { id: "LAHORE", name: "Lahore", tehsils: [{ id: "LAHORE_T", name: "Lahore", unionCouncils: [] }] }
      ]}
    ]},
    { id: "SD", name: "Sindh", divisions: [
      { id: "KARACHI", name: "Karachi", districts: [
        { id: "KARACHI_EAST", name: "Karachi East", tehsils: [{ id: "KARACHI_EAST_T", name: "Karachi East", unionCouncils: [] }] }
      ]}
    ]},
    { id: "BA", name: "Balochistan", divisions: [
      { id: "QUETTA", name: "Quetta", districts: [
        { id: "QUETTA", name: "Quetta", tehsils: [{ id: "QUETTA_T", name: "Quetta", unionCouncils: [] }] }
      ]}
    ]},
    { id: "ICT", name: "Islamabad Capital Territory", divisions: [
      { id: "ISLAMABAD", name: "Islamabad", districts: [
        { id: "ISLAMABAD", name: "Islamabad", tehsils: [{ id: "ISLAMABAD_URBAN", name: "Islamabad Urban", unionCouncils: [] }] }
      ]}
    ]},
    { id: "GB", name: "Gilgit-Baltistan", divisions: [
      { id: "GILGIT", name: "Gilgit", districts: [
        { id: "GILGIT", name: "Gilgit", tehsils: [{ id: "GILGIT_T", name: "Gilgit", unionCouncils: [] }] }
      ]}
    ]},
    { id: "AJK", name: "Azad Jammu and Kashmir", divisions: [
      { id: "MUZAFFARABAD", name: "Muzaffarabad", districts: [
        { id: "MUZAFFARABAD", name: "Muzaffarabad", tehsils: [{ id: "MUZAFFARABAD_T", name: "Muzaffarabad", unionCouncils: [] }] }
      ]}
    ]}
  ]
};
export function getProvinces(): Province[] { return GEO_DATA.provinces; }
export function getDivisions(pid: string): Division[] { return GEO_DATA.provinces.find(p => p.id === pid)?.divisions ?? []; }
export function getDistricts(pid: string, did: string): District[] { return getDivisions(pid).find(d => d.id === did)?.districts ?? []; }
export function getTehsils(pid: string, did: string, tid: string): Tehsil[] { return getDistricts(pid, did).find(d => d.id === tid)?.tehsils ?? []; }
export function getUnionCouncils(pid: string, did: string, tid: string, uid: string): UnionCouncil[] { return getTehsils(pid, did, tid).find(t => t.id === uid)?.unionCouncils ?? []; }
export function getVillages(pid: string, did: string, tid: string, uid: string, vid: string): string[] { return getUnionCouncils(pid, did, tid, uid).find(u => u.id === vid)?.villages ?? []; }
export const COUNTRIES = [
  { code: "PK", name: "Pakistan" },
  { code: "IN", name: "India" },
  { code: "BD", name: "Bangladesh" },
  { code: "AF", name: "Afghanistan" },
  { code: "IR", name: "Iran" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "QA", name: "Qatar" },
  { code: "OM", name: "Oman" },
  { code: "KW", name: "Kuwait" },
  { code: "BH", name: "Bahrain" },
  { code: "MY", name: "Malaysia" },
  { code: "TR", name: "Turkey" },
  { code: "CN", name: "China" },
  { code: "UK", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "ZA", name: "South Africa" },
  { code: "OTHER", name: "Other" }
] as const;