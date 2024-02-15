import openai
from config import OPENAI_API_KEY  # Import the API key from config.py

# Set OpenAI API key from the config file
openai.api_key = OPENAI_API_KEY

# Function to translate a long piece of text from Japanese to English
def translate_long_text(input_text):
    translated_chunks = []

    # Split the input_text into smaller chunks (sentences, paragraphs, etc.)
    # You can customize the chunk size based on your needs
    chunk_size = 1000  # Maximum characters per chunk
    chunks = [input_text[i:i + chunk_size] for i in range(0, len(input_text), chunk_size)]

    # Translate each chunk to English
    for chunk in chunks:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Translate the following Japanese text to English: '{chunk}'",
            max_tokens=50  # Adjust token limit as needed
        )
        translated_chunks.append(response.choices[0].text)

    # Combine the translated chunks into a single translated text
    translated_text = ' '.join(translated_chunks)

    return translated_text

# Example usage:
input_text = "Your long piece of Japanese text here."
translated_text = translate_long_text(input_text)
print(translated_text)