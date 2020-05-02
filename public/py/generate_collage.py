import argparse

def main(binary, color):
	print(binary.split(' '))

if __name__ == "__main__":
	p = argparse.ArgumentParser(description="Generate an image collage based on a series of images.")
	p.add_argument('-b', '--binary', type=str, required=True, help="Binary data of images.")
	p.add_argument('-c', '--color', type=str, required=True, help="Color to be used in collage.")
	args = p.parse_args()
	main(binary=args.binary,color=args.color)