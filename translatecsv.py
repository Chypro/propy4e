import openai
import pandas as pd
from config import OPENAI_API_KEY  # Import the API key from config.py

# Set OpenAI API key from the config file
openai.api_key = OPENAI_API_KEY


def translate_text(input_text):
    # Split the input text into smaller chunks
    chunk_size = 1000  # Maximum characters per chunk
    chunks = [input_text[i:i + chunk_size] for i in range(0, len(input_text), chunk_size)]

    # Translate each chunk to English
    translated_chunks = []
    for chunk in chunks:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Translate the following Japanese text to English: '{chunk}'",
            max_tokens=200  # Adjust token limit as needed; initially 50
        )
        translated_chunks.append(response.choices[0].text)

    # Combine the translated chunks into a single translated text
    translated_text = ' '.join(translated_chunks)

    return translated_text

def translate_csv(file_path):
    if not file_path.endswith(".csv"):
        print("Unsupported file format. Please provide a CSV file.")
        return

    df = pd.read_csv(file_path)
    # Combine all text columns into a single string
    input_text = " ".join(df.select_dtypes(include=['object']).stack().tolist())

    # Translate the text
    translated_text = translate_text(input_text)

    return translated_text

# Ask the user for the file path
file_path = input("Enter the path to the CSV file (e.g., /path/to/data.csv): ")

# Translate the CSV file
translated_text = translate_csv(file_path)
print(translated_text)
