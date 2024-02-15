import tiktoken

def count_tokens_in_csv(csv_file):
    with open(csv_file, 'r') as file:
        text = file.read()
        tokenizer = tiktoken.Tokenizer()
        tokenizer.feed(text)
        token_count = tokenizer.count_tokens()
    return token_count

# Example usage:
csv_file = '/Users/profielddev/Desktop/profield/chypro/JA Test Pro List.csv'
token_count = count_tokens_in_csv(csv_file)
print(f"Token count: {token_count}")
