from PIL import Image

def gif_to_png(gif_path, output_dir):
    # Open the GIF image
    gif = Image.open(gif_path)

    # Iterate over each frame in the GIF
    for frame_number in range(gif.n_frames):
        # Seek to the current frame
        gif.seek(frame_number)

        # Convert the current frame to PNG format
        frame = gif.copy().convert("RGBA")

        # Save the frame as a PNG file
        output_path = f"{output_dir}/frame_{frame_number:03d}.png"
        frame.save(output_path, "PNG")

        print(f"Converted frame {frame_number+1}/{gif.n_frames}")

    print("Conversion completed!")

# Specify the path to the GIF file
gif_path = "/Users/Destaran/Documents/Coding/React/PrintPlanetJS/public/player.gif"

# Specify the output directory for PNG files
output_dir = "/Users/Destaran/Documents/Coding/React/PrintPlanetJS/public/player-png"

# Call the function to convert the GIF to PNG
gif_to_png(gif_path, output_dir)
