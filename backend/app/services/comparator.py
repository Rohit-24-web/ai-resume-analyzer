from rapidfuzz import fuzz

def compare_skills(resume_skills: list[str], jd_skills: list[str]) -> dict:
    matched, missing = [], []
    resume_lower = [s.lower() for s in resume_skills]

    for jd_skill in jd_skills:
        best_match = max(
            (fuzz.ratio(jd_skill.lower(), r) for r in resume_lower),
            default=0
        )
        if best_match >= 80:
            matched.append(jd_skill)
        else:
            missing.append(jd_skill)

    match_percent = round((len(matched) / len(jd_skills)) * 100) if jd_skills else 0

    return {
        "matched": matched,
        "missing": missing,
        "match_percent": match_percent
    }