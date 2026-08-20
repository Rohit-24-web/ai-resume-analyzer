# backend/app/services/recommender.py
import requests, os

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

def get_courses_for_skill(skill: str, max_results: int = 3) -> list[dict]:
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": f"{skill} full course tutorial",
        "type": "video",
        "maxResults": max_results,
        "key": YOUTUBE_API_KEY,
        "order": "relevance"
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        items = response.json().get("items", [])

        return [
            {
                "title": item["snippet"]["title"],
                "url": f"https://youtube.com/watch?v={item['id']['videoId']}",
                "channel": item["snippet"]["channelTitle"]
            }
            for item in items
        ]
    except requests.RequestException as e:
        print(f"YouTube API Error for {skill}: {e}")
        return []

def get_roadmap(missing_skills: list[str]) -> dict:
    roadmap = {}
    # We limit to the first 5 missing skills so we don't burn through 
    # your free YouTube API quota in a single click!
    for skill in missing_skills[:5]:
        roadmap[skill] = get_courses_for_skill(skill)
    return roadmap