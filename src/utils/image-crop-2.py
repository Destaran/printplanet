from PIL import Image
import os

# Path to the folder containing the PNG files
folder_path = "/Users/Destaran/Documents/Coding/React/PrintPlanetJS/public/crop"

# Iterate over each file in the folder
for filename in os.listdir(folder_path):
    if filename.endswith(".png"):
        # Open the image
        file_path = os.path.join(folder_path, filename)
        image = Image.open(file_path)

        # Crop the image to the desired dimensions
        cropped_image = image.crop((0, 0, 150, 150))  # (left, upper, right, lower)

        # Save the cropped image
        cropped_image.save(file_path)

        # Close the image
        image.close()