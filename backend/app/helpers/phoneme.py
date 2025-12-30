import os

os.environ["PHONEMIZER_ESPEAK_LIBRARY"] = r"C:\Program Files\eSpeak NG\libespeak-ng.dll"

from phonemizer import phonemize
from phonemizer.separator import Separator


def text_to_phonemes(text):
    return phonemize(text, backend="espeak", separator=Separator(" "), language="en-us")
