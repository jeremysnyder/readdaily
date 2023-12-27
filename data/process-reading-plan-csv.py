import csv, json, os

readers_reading_file = "./readers.plan.2024.csv"


def cleandict(x):
    return {k: v for k, v in x.items() if v}


def source_to_plan(source_item):
    return cleandict(
        {
            "family": source_item.get("Family"),
            "ot1": source_item.get("OT1"),
            "ot2": source_item.get("OT2"),
            "ot3": source_item.get("OT3"),
            "fullot": source_item.get("Full OT"),
            "psalms": f"Psalms {source_item.get('Psalms')}",
            "nt": source_item.get("NT"),
        }
    )


def file_to_map(file):
    readings = {}
    with open(file, "r") as f:
        rows = csv.DictReader(f)
        reading_number = 0
        for row in rows:
            if has_readings(row):
                reading_number += 1
                readings[str(reading_number)] = source_to_plan(row)

    return readings


def has_readings(row):
    return (
        row.get("OT1")
        or row.get("OT2")
        or row.get("OT3")
        or row.get("Full OT")
        or row.get("Psalms")
        or row.get("NT")
    )


def to_reading_file(readings, f):
    json.dump(readings, f, indent=2)


def write_reading_files(filename, readings):
    reading_dir = f"./{filename}"
    if not os.path.exists(reading_dir):
        os.mkdir(reading_dir)
    for k, v in readings.items():
        with open(f"./{reading_dir}/{k}.json", "w") as f:
            to_reading_file(v, f)


if __name__ == "__main__":
    readers_readings = file_to_map(readers_reading_file)
    write_reading_files("chapter-bible-reading-plan", readers_readings)
