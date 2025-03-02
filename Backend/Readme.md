Changes Made

#Multi-Deletion Route:
Added a new route /deleteMultipleTransactions that accepts a POST request.
The request body should contain:
transactionIds: An array of transaction IDs to delete.
userId: The ID of the user whose transactions are being deleted.


#Fetch Single Transaction Route:
Added a new route /getTransaction/:id that accepts a GET request.
The route parameter id is the transaction ID to fetch.


#Enhanced Validations:
Added stronger validations for name, email, and password fields in the userSchema.js file.
Ensured passwords contain uppercase, lowercase, numbers, and special characters.
Validated email format using validator.isEmail.

#Improved Error Handling:
Standardized error messages and status codes across all controllers.
Added checks for invalid inputs (e.g., invalid email, weak password) and provided clear error responses.

#New Features:
Added a default avatar URL for users who don’t upload an image.
Excluded sensitive fields like password from API responses for security.

