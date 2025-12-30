import subprocess


def convert_to_wav(input_path: str, output_path: str):
    command = [
        "ffmpeg",
        "-y",  # overwrite
        "-i",
        input_path,
        "-ac",
        "1",  # mono
        "-ar",
        "16000",  # 16kHz (ASR-friendly)
        output_path,
    ]
    subprocess.run(
        command,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=True,
    )
