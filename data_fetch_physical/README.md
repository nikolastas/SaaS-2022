# Data fetch Physical Flows

Κύρια λειτουργία του microservice αυτού είναι:

- Περιμένει μήνυμα απο το microservice modify_physical_flows απο τον Kafka
- Για την δοσμένη ημερομηνία, λαμβανει τα κατάλληλα δεδομένα απο την βάση του αντίστοιχου microservice data modify
- Ανέβάζει τα δεδομένα στην βάση του
- Όταν ζητηθεί απο το frontend, εκτελεί αίτημα POST (εφόσον επαληθεύσει την ταυτότητα χρήστη)και επιστρέφει μέσω SQL query τα κατάλληλα δεδομένα στο frontend