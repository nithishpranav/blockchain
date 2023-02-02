This is the Document Store Project

Current Progress
    Compress document using gzip in python
    //encrypt using symmetric key
    split compressed documents into shards
    




Whole 
Send
Verify information:
Sender destination is ready and owned by the service
Recipient destination is ready
Document to be transferred exists
Generate transfer ID (UUID v4)
Calculate document hash (SHA256)
Calculate transfer hash (SHA256) by concatenating sender destination, recipient destination, document hash and transfer timestamp.
Sign transfer hash using sender destination private key (RSA-SHA256)
Compress document (GZip)
Generate random symmetric key
Encrypt compressed document using symmetric key
Split (compressed+encrypted) document into shards (256KB)
Dispatch shards via Kafka as they become available:
Message header (messageType): shard-< transfer ID >-< shard number (0 index) >
Message body: (binary) shard content
Build transfer metadata containing:
Sender destination
Recipient destination
Document Hash
Document name
Transfer hash signature
Shard count
Transfer timestamp
Encrypt metadata using symmetric key
Obtain recipient destination x509 certificate from ID Registry
Obtain recipient public key from destination x509 certificate
Encrypt symmetric key with recipient public key
Dispatch message with encrypted key + encrypted metadata via Kafka:
Message key: data-< transfer ID >
Message body:
bytes 0 to cert key length (default 2k) / 8: encrypted symmetric key
Remaining bytes: encrypted transfer metadata
Log transfer with status "sent"
Send out push notification
Receive
Save shards to temporary storage as they arrive
Load encrypted metadata message into memory when it arrives
Obtain symmetric key:
decrypt bytes 0 to cert key length (default: 2k) / 8 of in-memory metadata using recipient destination private key
Decrypt remaining metadata bytes using symmetric key
Verify metadata information:
Recipient destination is valid and owned by the service
Reassemble document:
Read shards from temporary storage
Decrypt using symmetric key
Uncompress
Append to single file in temporary storage
Calculate hash (SHA256)
Verify reassembled document hash matches hash in metadata
Retrieve sender destination X509 certificate from ID Registry
Calculate transfer hash (SHA256) by concatenating sender destination, recipient destination, document hash and transfer timestamp.
Verify transfer signature in metadata against sender certificate and transfer hash
Move assembled document to permanent storage
Clean all shards and assembled file from temporary storage
Determine transfer status: "received" if successful or "failed" if errors were encountered
Sign transfer hash using recipient destination private key
Build acknowledgement metadata containing:
Transfer timestamp (from metadata)
Transfer hash signature
Transfer status
Generate new random symmetric key
Encrypt acknowledgement using new symmetric key
Encrypt new symmetric key using sender destination certificate (obtained in step 8)
Dispatch acknowledgement via Kafka:
Message header (messageType): ack-< transfer ID >
Message body::
bytes 0 to cert key length (default 2k) / 8: encrypted new symmetric key
Remaining bytes: encrypted acknowledgement metadata
Log transfer with status determined in step 12
Send out push notification
Acknowledgement
Obtain symmetric key:
decrypt bytes 0 to cert key length (default: 2k) / 8 of in-memory metadata using sender destination private key
Decrypt remaining bytes using symmetric key
Update transfer log with status from acknowledgement metadata
Send out push notifications



