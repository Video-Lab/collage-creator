def main(paths, color):
	pass

if __name__ == "__main__":
	p = argparse.ArgumentParser(description="Generate an image collage based on a series of images.")
	p.add_argument('-p', '--paths', type=list, nargs='+', required=True, help="Paths to images")
	p.add_argument('-c', '--color', type=str, required=True, help="Color to be used in collage.")
	args = p.parse_args()
	main(paths=paths,color=color)