# auth.py
# Import the encrypt and decrypt functions from cipher.py
from cipher import encrypt, decrypt

# Dummy function to simulate fetching a user's encrypted password from the database
def get_encrypted_password_from_db(username):
    # This should retrieve the encrypted password for the user from the database
    return 'encrypted_password'

def authenticate_user(username, password, N, D):
    # Retrieve the encrypted password from the database
    encrypted_password = get_encrypted_password_from_db(username)
    
    # Decrypt the stored password to compare
    decrypted_password = decrypt(encrypted_password, N, D)
    
    # Compare the decrypted password with the provided one
    return decrypted_password == password
