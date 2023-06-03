import os

# Path to the folder containing the PNG files
folder_path = "/Users/Destaran/Documents/Coding/React/PrintPlanetJS/public/new-icons"

# Iterate over each file in the folder
for filename in os.listdir(folder_path):
    if filename.endswith(".png"):
        # Check if the filename starts with a capital letter
        if filename[0].isupper():
            # Convert the first character to lowercase
            new_name = filename[0].lower() + filename[1:]
        else:
            new_name = filename

        # Replace "_" characters with "-"
        new_name = new_name.replace("_", "-")

        # Construct the new file path
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, new_name)

        # Rename the file
        os.rename(old_path, new_path)