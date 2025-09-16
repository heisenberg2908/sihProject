# simulate_reports.py
import pandas as pd
import random
from datetime import datetime

# --- Configuration ---
NUM_REPORTS = 20  # Number of SMS reports to simulate
# In a real scenario, you'd get valid farmer IDs from M1's registration contract
FARMER_IDS = [101, 102, 103, 104, 105, 201, 202, 203] 
EVENT_CODES = {
    'flood': 1,
    'drought': 2,
    'pest': 3
}

# --- Generate Reports ---
print("Simulating farmer SMS reports...")
sms_reports = []
for i in range(NUM_REPORTS):
    farmer_id = random.choice(FARMER_IDS)
    event_name, event_code = random.choice(list(EVENT_CODES.items()))
    # Use 'i' to ensure each timestamp is unique for the simulation
    timestamp = int(datetime.now().timestamp()) + i 

    report = {
        'farmer_id': farmer_id,
        'event_code': event_code,
        'timestamp': timestamp,
        'event_name': event_name # Included for readability in the CSV
    }
    sms_reports.append(report)

# --- Save to CSV ---
df = pd.DataFrame(sms_reports)
df.to_csv('simulated_reports.csv', index=False)

print(f"✅ Successfully generated and saved {len(sms_reports)} reports to simulated_reports.csv")
print("\n--- Sample Data ---")
print(df.head())