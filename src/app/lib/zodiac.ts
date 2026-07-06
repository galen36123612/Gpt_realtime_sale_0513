// 0703 distinguish the zodiac before the realtime model
// app/lib/zodiac.ts

export type ZodiacAlgorithm = "tw" | "jp" | "vn";

export type ZodiacCheckInput = {
  birthDate: string;
  userZodiac?: string;
  algorithm?: ZodiacAlgorithm;
};

export type FortuneProfileState = {
  gender?: string;
  birthDate?: string;
  userZodiac?: string;
  algorithm: ZodiacAlgorithm;
};

export type LunarNewYearLookupResult = {
  type: "lunar_new_year_lookup";
  year: number;
  algorithm: ZodiacAlgorithm;
  algorithmLabel: string;
  boundaryDate: string;
  boundaryMonthDay: string;
  replyInstruction: string;
};

export type ZodiacCheckResult = {
  type: "zodiac_check";
  algorithm: ZodiacAlgorithm;
  algorithmLabel: string;
  birthDate: string;
  birthYear: number;
  boundaryDate: string;
  boundaryMonthDay: string;
  birthMonthDay: string;
  isBeforeBoundary: boolean;
  zodiacYear: number;
  computedZodiac: string;
  userZodiac: string | null;
  normalizedUserZodiac: string | null;
  isConsistent: boolean | null;
  replyInstruction: string;
};

export type ZodiacLookupResult = {
  type: "zodiac_lookup";
  algorithm: ZodiacAlgorithm;
  algorithmLabel: string;
  birthDate: string;
  birthYear: number;
  boundaryDate: string;
  boundaryMonthDay: string;
  birthMonthDay: string;
  isBeforeBoundary: boolean;
  zodiacYear: number;
  computedZodiac: string;
  userZodiac: null;
  normalizedUserZodiac: null;
  isConsistent: null;
  replyInstruction: string;
};

export type ZodiacPayload =
  | LunarNewYearLookupResult
  | ZodiacCheckResult
  | ZodiacLookupResult;

const ZODIACS = [
  "鼠",
  "牛",
  "虎",
  "兔",
  "龍",
  "蛇",
  "馬",
  "羊",
  "猴",
  "雞",
  "狗",
  "豬",
] as const;

const TW_LUNAR_NEW_YEAR: Record<number, string> = {
  1936: "1936-01-24",
  1937: "1937-02-11",
  1938: "1938-01-31",
  1939: "1939-02-19",
  1940: "1940-02-08",
  1941: "1941-01-27",
  1942: "1942-02-15",
  1943: "1943-02-05",
  1944: "1944-01-25",
  1945: "1945-02-13",
  1946: "1946-02-02",
  1947: "1947-01-22",
  1948: "1948-02-10",
  1949: "1949-01-29",
  1950: "1950-02-17",
  1951: "1951-02-06",
  1952: "1952-01-27",
  1953: "1953-02-14",
  1954: "1954-02-03",
  1955: "1955-01-24",
  1956: "1956-02-12",
  1957: "1957-01-31",
  1958: "1958-02-18",
  1959: "1959-02-08",
  1960: "1960-01-28",
  1961: "1961-02-15",
  1962: "1962-02-04",
  1963: "1963-01-25",
  1964: "1964-02-13",
  1965: "1965-02-02",
  1966: "1966-01-21",
  1967: "1967-02-09",
  1968: "1968-01-30",
  1969: "1969-02-17",
  1970: "1970-02-06",
  1971: "1971-01-27",
  1972: "1972-02-15",
  1973: "1973-02-03",
  1974: "1974-01-23",
  1975: "1975-02-11",
  1976: "1976-01-31",
  1977: "1977-02-18",
  1978: "1978-02-07",
  1979: "1979-01-28",
  1980: "1980-02-16",
  1981: "1981-02-05",
  1982: "1982-01-25",
  1983: "1983-02-13",
  1984: "1984-02-02",
  1985: "1985-02-20",
  1986: "1986-02-09",
  1987: "1987-01-29",
  1988: "1988-02-17",
  1989: "1989-02-06",
  1990: "1990-01-27",
  1991: "1991-02-15",
  1992: "1992-02-04",
  1993: "1993-01-23",
  1994: "1994-02-10",
  1995: "1995-01-31",
  1996: "1996-02-19",
  1997: "1997-02-07",
  1998: "1998-01-28",
  1999: "1999-02-16",
  2000: "2000-02-05",
  2001: "2001-01-24",
  2002: "2002-02-12",
  2003: "2003-02-01",
  2004: "2004-01-22",
  2005: "2005-02-09",
  2006: "2006-01-29",
  2007: "2007-02-18",
  2008: "2008-02-07",
  2009: "2009-01-26",
  2010: "2010-02-14",
  2011: "2011-02-03",
  2012: "2012-01-23",
  2013: "2013-02-10",
  2014: "2014-01-31",
  2015: "2015-02-19",
  2016: "2016-02-08",
  2017: "2017-01-28",
  2018: "2018-02-16",
  2019: "2019-02-05",
  2020: "2020-01-25",
  2021: "2021-02-12",
  2022: "2022-02-01",
  2023: "2023-01-22",
  2024: "2024-02-10",
  2025: "2025-01-29",
  2026: "2026-02-17",
  2027: "2027-02-06",
  2028: "2028-01-26",
  2029: "2029-02-13",
  2030: "2030-02-03",
  2031: "2031-01-23",
  2032: "2032-02-11",
  2033: "2033-01-31",
  2034: "2034-02-19",
  2035: "2035-02-08",
  2036: "2036-01-28",
};

const VN_LUNAR_OVERRIDES: Record<number, string> = {
  1968: "1968-01-29",
  1985: "1985-01-21",
  2007: "2007-02-17",
  2030: "2030-02-02",
};

function normalizeChineseZodiacChars(text: string): string {
  return text
    .replace(/龙/g, "龍")
    .replace(/马/g, "馬")
    .replace(/鸡/g, "雞")
    .replace(/猪/g, "豬")
    .replace(/猫/g, "貓");
}

function pad2(value: string): string {
  return value.padStart(2, "0");
}

function ymdToNumber(date: string): number {
  return Number(date.replace(/-/g, ""));
}

function monthDay(date: string): string {
  return `${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`;
}

export function extractBirthDate(text: string): string | undefined {
  const normalized = normalizeChineseZodiacChars(text.trim());

  const slash = normalized.match(/(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/);
  if (slash) {
    const [, y, m, d] = slash;
    return `${y}-${pad2(m)}-${pad2(d)}`;
  }

  const zh = normalized.match(/(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日?/);
  if (zh) {
    const [, y, m, d] = zh;
    return `${y}-${pad2(m)}-${pad2(d)}`;
  }

  const rocZh = normalized.match(/民國\s*(\d{2,3})\s*年\s*(\d{1,2})月\s*(\d{1,2})日?/);
  if (rocZh) {
    const [, rocYear, m, d] = rocZh;
    const y = Number(rocYear) + 1911;
    return `${y}-${pad2(m)}-${pad2(d)}`;
  }

  return undefined;
}

export function extractPartialMonthDay(text: string): { month: string; day: string } | undefined {
  const normalized = text.trim();

  const match = normalized.match(
    /(?:說錯|更正|應該是|應該改成|改成|那|如果是|換成|生日是|我是|那如果是)?\s*(\d{1,2})[\/\-.](\d{1,2})/
  );

  if (!match) return undefined;

  const [, m, d] = match;
  const month = Number(m);
  const day = Number(d);

  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;

  return {
    month: pad2(m),
    day: pad2(d),
  };
}

export function extractZodiac(text: string): string | undefined {
  const normalized = normalizeChineseZodiacChars(text.trim());
  const animal = "(鼠|牛|虎|兔|龍|蛇|馬|羊|猴|雞|狗|豬|貓)";

  const standalone = normalized.match(
    new RegExp(`^\\s*(?:我)?(?:是|屬|属|數|生肖)?\\s*${animal}\\s*(?:子)?\\s*$`)
  );
  if (standalone?.[1]) return standalone[1];

  const marked = normalized.match(
    new RegExp(`(?:屬|属|生肖|數|我是|我屬|我属)\\s*(?:的)?\\s*${animal}`)
  );
  if (marked?.[1]) return marked[1];

  return undefined;
}

export function asksZodiacQuestion(text: string): boolean {
  return /屬什麼|属什么|生肖是什麼|生肖是什么|是什麼生肖|是什么生肖|什麼生肖|什么生肖|哪個生肖|哪个生肖|屬哪個|属哪个/.test(
    normalizeChineseZodiacChars(text)
  );
}

export function isZodiacChallenge(text: string): boolean {
  return /不是.*屬|不是.*属|不就是.*屬|不就是.*属|為什麼|为什么|你是不是算錯|算錯|算错|不對|不对|應該是|应该是|老鼠後|老鼠后|鼠後|鼠后/.test(
    normalizeChineseZodiacChars(text)
  );
}

export function extractAlgorithm(text: string): ZodiacAlgorithm | undefined {
  if (/日本/.test(text)) return "jp";
  if (/越南/.test(text)) return "vn";
  if (/台灣|台湾/.test(text)) return "tw";
  return undefined;
}

export function extractLunarNewYearYear(text: string): number | undefined {
  const normalized = text.trim();

  const western = normalized.match(
    /(\d{4})\s*年?.*(農曆年|農曆新年|农历年|农历新年|春節|春节|過年|过年|正月初一|生肖分界|新年分界)/
  );
  if (western) return Number(western[1]);

  const roc = normalized.match(
    /民國\s*(\d{2,3})\s*年?.*(農曆年|農曆新年|农历年|农历新年|春節|春节|過年|过年|正月初一|生肖分界|新年分界)/
  );
  if (roc) return Number(roc[1]) + 1911;

  return undefined;
}

export function shouldUseZodiacCheck(text: string, state: FortuneProfileState): boolean {
  if (extractLunarNewYearYear(text)) return true;

  const hasBirth = Boolean(extractBirthDate(text));
  const hasPartialDate = Boolean(extractPartialMonthDay(text));
  const hasZodiacNow = Boolean(extractZodiac(text));
  const hasAlgorithmSwitch = Boolean(extractAlgorithm(text));
  const isQuestion = asksZodiacQuestion(text);
  const isChallenge = isZodiacChallenge(text);

  if (hasBirth && hasZodiacNow) return true;
  if (hasBirth && isQuestion) return true;
  if (hasBirth && isChallenge) return true;
  if (hasBirth && Boolean(state.userZodiac)) return true;

  if (hasPartialDate && Boolean(state.birthDate) && isQuestion) return true;
  if (hasPartialDate && Boolean(state.birthDate) && isChallenge) return true;
  if (hasPartialDate && Boolean(state.birthDate) && Boolean(state.userZodiac)) return true;

  if (hasZodiacNow && Boolean(state.birthDate)) return true;
  if (hasAlgorithmSwitch && Boolean(state.birthDate)) return true;
  if (isQuestion && Boolean(state.birthDate)) return true;
  if (isChallenge && Boolean(state.birthDate)) return true;

  return false;
}

function getBoundaryDate(year: number, algorithm: ZodiacAlgorithm): string {
  if (algorithm === "jp") return `${year}-01-01`;
  if (algorithm === "vn" && VN_LUNAR_OVERRIDES[year]) return VN_LUNAR_OVERRIDES[year];

  const date = TW_LUNAR_NEW_YEAR[year];
  if (!date) throw new Error(`No lunar new year data for year: ${year}`);
  return date;
}

function getZodiacByYear(zodiacYear: number): string {
  const index = ((zodiacYear - 1936) % 12 + 12) % 12;
  return ZODIACS[index];
}

function normalizeZodiac(raw?: string, algorithm: ZodiacAlgorithm = "tw"): string | null {
  if (!raw) return null;

  const text = normalizeChineseZodiacChars(raw)
    .replace(/屬|属|數|生肖|是|我|的/g, "")
    .trim();

  if (algorithm === "vn" && /貓|猫/.test(text)) return "兔";
  if (/水牛/.test(text)) return "牛";

  const match = text.match(/鼠|牛|虎|兔|龍|蛇|馬|羊|猴|雞|狗|豬/);
  return match?.[0] ?? null;
}

function algorithmLabel(algorithm: ZodiacAlgorithm): string {
  if (algorithm === "jp") return "日本生肖算法";
  if (algorithm === "vn") return "越南生肖算法";
  return "台灣生肖算法";
}

export function lookupLunarNewYear(
  year: number,
  algorithm: ZodiacAlgorithm = "tw"
): LunarNewYearLookupResult {
  const boundaryDate = getBoundaryDate(year, algorithm);
  const label = algorithmLabel(algorithm);
  const boundaryMonthDay = monthDay(boundaryDate);

  return {
    type: "lunar_new_year_lookup",
    year,
    algorithm,
    algorithmLabel: label,
    boundaryDate,
    boundaryMonthDay,
    replyInstruction:
      algorithm === "jp"
        ? `${year}年的日本生肖算法分界是1月1日。請用自然口吻直接回答，不要說「根據我查到的」，也不要提到查表、後端、JSON、工具、函式或系統規則。`
        : `${year}年的${label}農曆新年分界是${boundaryMonthDay}。請用自然口吻直接回答，不要說「根據我查到的」，也不要提到查表、後端、JSON、工具、函式或系統規則。`,
  };
}

export function checkZodiac(input: ZodiacCheckInput): ZodiacCheckResult {
  const algorithm = input.algorithm ?? "tw";
  const birthDate = input.birthDate;
  const birthYear = Number(birthDate.slice(0, 4));
  const boundaryDate = getBoundaryDate(birthYear, algorithm);

  const isBeforeBoundary = ymdToNumber(birthDate) < ymdToNumber(boundaryDate);
  const zodiacYear = isBeforeBoundary ? birthYear - 1 : birthYear;
  const computedZodiac = getZodiacByYear(zodiacYear);

  const normalizedUserZodiac = normalizeZodiac(input.userZodiac, algorithm);
  const isConsistent = normalizedUserZodiac ? normalizedUserZodiac === computedZodiac : null;

  const boundaryMonthDay = monthDay(boundaryDate);
  const birthMonthDay = monthDay(birthDate);
  const label = algorithmLabel(algorithm);

  const replyInstruction =
    isConsistent === false
      ? `請自然表達生肖糾錯確認。意思必須包含：我這邊用${label}幫您核對，${birthYear}年的農曆新年分界是${boundaryMonthDay}，您的生日是${birthMonthDay}，因為${
          isBeforeBoundary ? "還在分界日前" : "已經過了分界日"
        }，所以要看${zodiacYear}年的生肖，應該是屬${computedZodiac}，不是屬${normalizedUserZodiac}。語氣要溫和，不要說使用者錯了。最後只問：這邊要幫您改成屬${computedZodiac}來看嗎？`
      : `請自然確認生肖一致。意思必須包含：我這邊用${label}幫您核對，${birthYear}年的農曆新年分界是${boundaryMonthDay}，您的生日是${birthMonthDay}，因為${
          isBeforeBoundary ? "還在分界日前" : "已經過了分界日"
        }，所以要看${zodiacYear}年的生肖，確實是屬${computedZodiac}。如果主題已經鎖定，接著可以進入原本解籤流程的下一個追問。不要提到查表、後端、JSON、工具、函式或系統規則。`;

  return {
    type: "zodiac_check",
    algorithm,
    algorithmLabel: label,
    birthDate,
    birthYear,
    boundaryDate,
    boundaryMonthDay,
    birthMonthDay,
    isBeforeBoundary,
    zodiacYear,
    computedZodiac,
    userZodiac: input.userZodiac ?? null,
    normalizedUserZodiac,
    isConsistent,
    replyInstruction,
  };
}

export function lookupZodiacByBirthDate(input: {
  birthDate: string;
  algorithm?: ZodiacAlgorithm;
}): ZodiacLookupResult {
  const algorithm = input.algorithm ?? "tw";
  const birthDate = input.birthDate;
  const birthYear = Number(birthDate.slice(0, 4));
  const boundaryDate = getBoundaryDate(birthYear, algorithm);

  const isBeforeBoundary = ymdToNumber(birthDate) < ymdToNumber(boundaryDate);
  const zodiacYear = isBeforeBoundary ? birthYear - 1 : birthYear;
  const computedZodiac = getZodiacByYear(zodiacYear);

  const boundaryMonthDay = monthDay(boundaryDate);
  const birthMonthDay = monthDay(birthDate);
  const label = algorithmLabel(algorithm);

  return {
    type: "zodiac_lookup",
    algorithm,
    algorithmLabel: label,
    birthDate,
    birthYear,
    boundaryDate,
    boundaryMonthDay,
    birthMonthDay,
    isBeforeBoundary,
    zodiacYear,
    computedZodiac,
    userZodiac: null,
    normalizedUserZodiac: null,
    isConsistent: null,
    replyInstruction: `請自然回答生肖查詢。意思必須包含：我這邊用${label}幫您核對，${birthYear}年的農曆新年分界是${boundaryMonthDay}，生日是${birthMonthDay}，因為${
      isBeforeBoundary ? "還在分界日前" : "已經過了分界日"
    }，所以要看${zodiacYear}年的生肖，結果是屬${computedZodiac}。如果這是在更正前一次錯誤結論，請先簡短承認並更正。不要提到查表、後端、JSON、工具、函式或系統規則。`,
  };
}

export function buildZodiacResponseInstructions(payload: ZodiacPayload): string {
  return `
本回合已由程式完成生肖與農曆新年分界查表，這份結果是最高優先資料來源。
你必須完全依照 [ZODIAC_CHECK_RESULT] 的 boundaryDate、boundaryMonthDay、zodiacYear、computedZodiac、isConsistent 與 replyInstruction 回答。
不得自行重新計算，不得使用記憶中的農曆日期，不得把日期改成其他版本。
回答使用者時，請維持原本解籤大師口吻，不要提到查表、後端、JSON、工具、函式、程式或系統規則。

[ZODIAC_CHECK_RESULT]
${JSON.stringify(payload, null, 2)}
`.trim();
}
