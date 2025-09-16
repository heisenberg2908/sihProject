# crypto_integration.py
import pandas as pd
from hashlib import sha256
from ecdsa import SigningKey, SECP256k1

# Load the reports from the CSV file created in the last step
df = pd.read_csv('../simulated_reports.csv')

print("Adding cryptographic hash and signature placeholders...")
hashes = []
signatures = []

for index, row in df.iterrows():
    # This message format is CRITICAL. 
    # It must be identical to the one M1 (Smart Contract) and M2 (Crypto) use.
    message = f"{row['farmer_id']}{row['event_code']}{row['timestamp']}"
    
    # 1. Create the hash (the data's unique fingerprint)
    report_hash = sha256(message.encode()).hexdigest()
    hashes.append(report_hash)

    # 2. Add a placeholder for the signature.
    # M2 will provide the real signing logic later.
    # This is just a correctly formatted placeholder.
    sk = SigningKey.generate(curve=SECP256k1)  # added rng sign key
    # signature = '0x' + ('a' * 130) 
    signature=sk.sign(report_hash.encode())
    signatures.append(signature.hex())

# Add the new columns to our data
df['hash'] = hashes
df['signature'] = signatures

# Save the cryptographically prepared data to a new file
df.to_csv('../prepared_reports.csv', index=False)

print("✅ Successfully added hashes and signatures.")
print("\n--- Sample of Prepared Data ---")
print(df.head())