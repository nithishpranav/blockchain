#file name input



#file_name = input("Enter file name: ")

folderPath = "C:/Users/Nithish/Desktop/College/SEM-4/blockchain/blockchain/project/chunkdump/"

CHUNK_SIZE = 25600
file_number = 1
with open("ipfs-p2p-file-system.pdf", "rb") as f:
    while True:
        chunk = f.read(CHUNK_SIZE)
        if not chunk:
            break
        with open(folderPath+"ipfs-p2p-file-system.pdf."+str(file_number), "wb") as f_out:
            f_out.write(chunk)
        file_number += 1