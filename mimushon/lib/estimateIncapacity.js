/* ─────────────────────────────────────────────────────────────────────────────
   Shared incapacity-degree estimation logic.
   Used by WorkAccidentScreen (questionnaire step) and
   TotalPercentageDisplay (results display).

   Output: { level: 60|65|74|100|'below', label, color, text }
   Colors: 'gray' | 'yellow' | 'orange' | 'red'
───────────────────────────────────────────────────────────────────────────── */
export function estimateIncapacity(answers) {
  // Currently working full time at same job → almost certainly below threshold
  if (answers.workStatus === 'full') {
    return {
      level: 'below',
      label: 'מתחת לסף הזכאות',
      color: 'gray',
      text: 'אתה/את עובד/ת במשרה מלאה כפי שעבדת לפני הפגיעה. ביטוח לאומי לא יקבע דרגת אי-כושר המזכה בקצבה כאשר כושר ההשתכרות לא נפגע בפועל.',
    };
  }

  // Can fully return to previous job → below threshold
  if (answers.returnToPrev === 'full') {
    return {
      level: 'below',
      label: 'מתחת לסף הזכאות',
      color: 'gray',
      text: 'אם ניתן לחזור לעבודה הקודמת במלואה, ביטוח לאומי ככל הנראה לא יקבע דרגת אי-כושר המזכה בקצבה חודשית.',
    };
  }

  // Calculate modifier score based on aggravating factors
  const ageScore      = { under45: 0, '45to54': 1, '55to59': 2, '60plus': 3 }[answers.age]       ?? 0;
  const eduScore      = { none: 3, middle: 2, bagrut: 1, vocational: 0, academic: -1 }[answers.education] ?? 0;
  const sittingScore  = { over4h: 0, '1to4h': 1, under1h: 2, cannot: 3 }[answers.sitting]         ?? 0;
  const mobilityScore = { normal: 0, limited: 1, significant: 2, assisted: 3 }[answers.mobility]  ?? 0;
  const cogScore      = { normal: 0, mild: 1, significant: 2 }[answers.cognitive]                  ?? 0;
  const totalBoost    = ageScore + eduScore + sittingScore + mobilityScore + cogScore;

  // Core determination matrix: [returnToPrev × altWork] → base level, then boost
  const r = answers.returnToPrev; // 'partial' | 'no'
  const a = answers.altWork;      // 'yes' | 'limited' | 'no'

  if (r === 'partial' && a === 'yes') {
    return { level: 60, label: '60%', color: 'yellow', text: 'פגיעה משמעותית ביכולת ההשתכרות, אך נותרת יכולת עבודה חלקית. הוועדה צפויה לקבוע דרגת אי-כושר של 60%.' };
  }

  if (r === 'partial' && a === 'limited') {
    if (totalBoost >= 5) return { level: 65, label: '65%', color: 'orange', text: 'יכולת עבודה חלקית בלבד בעבודה הקודמת, ויכולת מוגבלת לעבודה חלופית. בשים לב לגיל, השכלה ומגבלות פיזיות — הוועדה צפויה לקבוע 65%.' };
    return { level: 60, label: '60%', color: 'yellow', text: 'יכולת עבודה חלקית בלבד בעבודה הקודמת. הוועדה צפויה לקבוע דרגת אי-כושר של 60%.' };
  }

  if (r === 'partial' && a === 'no') {
    if (totalBoost >= 6) return { level: 74, label: '74%', color: 'red', text: 'יכולת חלקית בלבד לעבודה הקודמת ואין יכולת עבודה חלופית. בשילוב גיל/השכלה/מגבלות פיזיות — הוועדה צפויה לקבוע 74% אי-כושר (₪3,211/חודש).' };
    return { level: 65, label: '65%', color: 'orange', text: 'יכולת חלקית בלבד לעבודה הקודמת ואין יכולת עבודה חלופית — הוועדה צפויה לקבוע דרגת אי-כושר של 65%.' };
  }

  if (r === 'no' && a === 'yes') {
    if (totalBoost >= 5) return { level: 65, label: '65%', color: 'orange', text: 'אינך יכול/ה לחזור לעבודה הקודמת, אך מסוגל/ת לעבוד בעבודה חלופית. בשים לב לגורמים נוספים — הוועדה צפויה לקבוע 65%.' };
    return { level: 60, label: '60%', color: 'yellow', text: 'אינך יכול/ה לחזור לעבודה הקודמת, אך מסוגל/ת לעבוד בעבודה חלופית מתאימה. הוועדה צפויה לקבוע דרגת אי-כושר של 60%.' };
  }

  if (r === 'no' && a === 'limited') {
    if (totalBoost >= 6) return { level: 74, label: '74%', color: 'red', text: 'אינך יכול/ה לחזור לעבודה הקודמת ויכולת העבודה החלופית מוגבלת מאוד. בשילוב גורמים נוספים — הוועדה צפויה לקבוע 74% אי-כושר (₪3,211/חודש).' };
    return { level: 65, label: '65%', color: 'orange', text: 'אינך יכול/ה לחזור לעבודה הקודמת ויכולת העבודה החלופית מוגבלת מאוד. הוועדה צפויה לקבוע דרגת אי-כושר של 65%.' };
  }

  if (r === 'no' && a === 'no') {
    if (totalBoost >= 5) return { level: 100, label: '100%', color: 'red', text: 'אינך יכול/ה לחזור לעבודה הקודמת ואינך מסוגל/ת לעבוד בשום עבודה אחרת. בשילוב גיל, השכלה ומגבלות פיזיות — הוועדה צפויה לקבוע 100% אי-כושר (₪4,711/חודש).' };
    return { level: 74, label: '74%', color: 'red', text: 'אינך יכול/ה לחזור לעבודה הקודמת ואינך מסוגל/ת לעבוד בשום עבודה. הוועדה צפויה לקבוע 74% אי-כושר (₪3,211/חודש).' };
  }

  return { level: 60, label: '60%', color: 'yellow', text: 'על בסיס התשובות — דרגת אי-כושר משוערת: 60%.' };
}
