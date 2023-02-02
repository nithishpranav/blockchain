#create a compressed file using gzip

import gzip

f_in = open('ipfs-p2p-file-system.pdf', 'rb')
f_out = gzip.open('ipfs-p2p-file-system.pdf.gz', 'wb')
f_out.writelines(f_in)
f_out.close()
f_in.close()



