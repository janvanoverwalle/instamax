import os
import csv
import json
import timeit

from pathlib import Path


CURRENT_DIR = Path(os.getcwd()).resolve()

INPUT_FILE = 'posts_info.csv'
OUTPUT_FILE = 'posts-info.js'

DATA_DIR = CURRENT_DIR / Path('data')
IMAGE_DIR = DATA_DIR / 'images'
VIDEO_DIR = DATA_DIR / 'videos'


def main():
    print(f'Converting {INPUT_FILE} to {OUTPUT_FILE} and organizing media files...')

    print('Reading CSV data...', end='', flush=True)
    s = timeit.default_timer()
    with open(CURRENT_DIR / INPUT_FILE, mode='r', encoding='utf-8') as csv_file:
        data = list(csv.DictReader(csv_file))
    e = timeit.default_timer()
    print(f'OK ({e - s:.2f} seconds)')

    print(f'Writing JSON data to {OUTPUT_FILE}...', end='', flush=True)
    s = timeit.default_timer()
    output_dir = CURRENT_DIR / DATA_DIR
    output_dir.mkdir(parents=True, exist_ok=True)
    with open(output_dir / OUTPUT_FILE, mode='w', encoding='utf-8') as json_file:
        json_file.write('const POSTS_INFO = ')
        json.dump(data, json_file, indent=2, ensure_ascii=False)
    e = timeit.default_timer()
    print(f'OK ({e - s:.2f} seconds)')

    print('Organizing media files...', end='', flush=True)
    s = timeit.default_timer()
    (CURRENT_DIR / INPUT_FILE).rename(DATA_DIR / INPUT_FILE)
    for file in CURRENT_DIR.iterdir():
        if not file.is_file():
            continue
        if file.suffix.lower() in {'.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov'}:
            if file.suffix.lower() in {'.mp4', '.mov'}:
                target_dir = VIDEO_DIR
            else:
                target_dir = IMAGE_DIR
            target_dir.mkdir(parents=True, exist_ok=True)
            target_path = target_dir / file.name
            file.rename(target_path)
    e = timeit.default_timer()
    print(f'OK ({e - s:.2f} seconds)')

    input('Conversion completed. Press Enter to exit...')


if __name__ == '__main__':
    main()
