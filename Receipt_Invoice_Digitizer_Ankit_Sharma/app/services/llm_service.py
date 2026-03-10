import google.generativeai as genai
import json
import re
from app.core.config import GEMINI_API_KEY

# config gemini api
genai.configure(api_key=GEMINI_API_KEY)

# Intialise the llm model
model = genai.GenerativeModel("gemini-2.5-flash")

# Fucntion to raw data
def extract_invoice_data(raw_text: str):

    prompt = f"""
    Extract the following fields from this invoice text.

    Return ONLY valid JSON with:
    invoice_number
    vendor_name
    date
    total_amount

    Invoice Text:
    {raw_text}
    """

    response = model.generate_content(prompt)

    text_response = response.text.strip()

    # Remove markdown if Gemini wraps JSON in ```json
    text_response = re.sub(r"```json|```", "", text_response).strip()


    try:
        structured_data = json.loads(text_response)
        return structured_data
    except:
        return {"error": "Failed to parse JSON", "raw_output": text_response}