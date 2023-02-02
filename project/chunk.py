#file name input



file_name = input("Enter file name: ")


CHUNK_SIZE = 256000
file_number = 1
with open("ipfs-p2p-file-system.pdf", "rb") as f:
    while True:
        chunk = f.read(CHUNK_SIZE)
        if not chunk:
            break
        with open(f"ipfs-p2p-file-system.pdf.{file_number}", "wb") as f_out:
            f_out.write(chunk)
        file_number += 1