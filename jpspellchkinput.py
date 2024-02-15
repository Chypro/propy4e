import openai
from config import OPENAI_API_KEY  # Import the API key from config.py

# Set OpenAI API key from the config file
openai.api_key = OPENAI_API_KEY

def correct_spelling_and_grammar(text_with_errors):
    # Call the OpenAI API to correct the text using GPT-3.5 (LLM)
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Correct the following text for spelling and grammar errors in Japanese: '{text_with_errors}'",
        max_tokens=1000  # Adjust this based on the response length you desire
    )

    # Extract the corrected text from the API response
    corrected_text = response.choices[0].text

    return corrected_text

# Get user input
user_input = input("Enter the Japanese text with spelling and grammar errors: ")

# Call the function to correct the user's input
corrected_text = correct_spelling_and_grammar(user_input)

# Print the corrected text
print("Original text:", user_input)
print("Corrected text:", corrected_text)
