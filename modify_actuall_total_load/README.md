# Data modify Actual Total Load

Κύρια λειτουργία του microservice αυτού είναι:

- Περιμένει μήνυμα απο το microservice input_actual_totall_load απο τον Kafka
- Για την δοσμένη ημερομηνία, λαμβανει τα κατάλληλα δεδομένα απο την βάση του αντίστοιχου microservice data input
- Επεξεργάζεται τα update Time της κάθε καταχώρησης
- Ανέβάζει τα επεξέργασμένα δεδομένα στην βάση του
- Στέλνει μήνυμα στον Kafka για να ενημερώσει το microservice data_fetch_total