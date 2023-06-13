from PIL import Image

def resize_image(input_image_path, output_image_path, size):
    with Image.open(input_image_path) as image:
        image.thumbnail(size)
        image.save(output_image_path)

input_image_path = "/Users/Destaran/Documents/Coding/React/PrintPlanetJS/public/player.png"
output_image_path = "/Users/Destaran/Documents/Coding/React/PrintPlanetJS/public/player-rescaled.png"
size = (64, 64)

resize_image(input_image_path, output_image_path, size)
