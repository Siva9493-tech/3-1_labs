# ============================================================
# IRS LAB - SIGNATURE FILE CONSTRUCTION
# ============================================================
#
# Technique:
#     Superimposed Coding
#
# Input:
#     A collection of TXT documents
#
# Output:
#     1. Vocabulary
#     2. Term Signatures
#     3. Document Signatures
#     4. Signature File
#     5. Search using Signature File
#
# ============================================================

import os
import re
import hashlib
import json

from pathlib import Path


# ============================================================
# 1. CONFIGURATION
# ============================================================

DOCUMENT_FOLDER = "documents"

SIGNATURE_LENGTH = 128

BITS_PER_TERM = 4

OUTPUT_FOLDER = "signature_output"


# ============================================================
# 2. CREATE OUTPUT DIRECTORY
# ============================================================

os.makedirs(
    OUTPUT_FOLDER,
    exist_ok=True
)


# ============================================================
# 3. TEXT PREPROCESSING
# ============================================================

def preprocess(text):

    # Convert to lowercase
    text = text.lower()

    # Remove punctuation and special characters
    text = re.sub(
        r"[^a-z0-9\s]",
        " ",
        text
    )

    # Tokenization
    words = text.split()

    return words


# ============================================================
# 4. READ DOCUMENT COLLECTION
# ============================================================

def read_documents(folder):

    documents = {}

    folder_path = Path(folder)

    files = sorted(
        folder_path.glob("*.txt")
    )

    for file in files:

        with open(
            file,
            "r",
            encoding="utf-8"
        ) as f:

            text = f.read()

        documents[file.name] = text

    return documents


# ============================================================
# 5. BUILD VOCABULARY
# ============================================================

def build_vocabulary(documents):

    vocabulary = set()

    for doc_name, text in documents.items():

        words = preprocess(text)

        for word in words:

            vocabulary.add(word)

    return sorted(vocabulary)


# ============================================================
# 6. GENERATE TERM SIGNATURE
# ============================================================

def generate_term_signature(
    term,
    signature_length=128,
    bits_per_term=4
):

    signature = [
        0
    ] * signature_length

    # Generate multiple hash values
    for i in range(bits_per_term):

        hash_input = (
            term + "_" + str(i)
        ).encode("utf-8")

        hash_value = hashlib.md5(
            hash_input
        ).hexdigest()

        number = int(
            hash_value,
            16
        )

        position = (
            number %
            signature_length
        )

        signature[position] = 1

    return signature


# ============================================================
# 7. GENERATE SIGNATURES FOR ALL TERMS
# ============================================================

def generate_term_signatures(
    vocabulary
):

    term_signatures = {}

    for term in vocabulary:

        signature = generate_term_signature(
            term,
            SIGNATURE_LENGTH,
            BITS_PER_TERM
        )

        term_signatures[
            term
        ] = signature

    return term_signatures


# ============================================================
# 8. SUPERIMPOSE TERM SIGNATURES
# ============================================================

def superimpose_signatures(
    signatures
):

    if not signatures:

        return [
            0
        ] * SIGNATURE_LENGTH

    document_signature = [
        0
    ] * SIGNATURE_LENGTH

    for signature in signatures:

        for i in range(
            SIGNATURE_LENGTH
        ):

            if signature[i] == 1:

                document_signature[i] = 1

    return document_signature


# ============================================================
# 9. CREATE DOCUMENT SIGNATURES
# ============================================================

def generate_document_signatures(
    documents,
    term_signatures
):

    document_signatures = {}

    for doc_name, text in documents.items():

        words = set(
            preprocess(text)
        )

        signatures = []

        for word in words:

            if word in term_signatures:

                signatures.append(
                    term_signatures[word]
                )

        document_signature = (
            superimpose_signatures(
                signatures
            )
        )

        document_signatures[
            doc_name
        ] = document_signature

    return document_signatures


# ============================================================
# 10. SAVE SIGNATURE FILE
# ============================================================

def save_signature_file(
    document_signatures
):

    filename = os.path.join(
        OUTPUT_FOLDER,
        "signature_file.txt"
    )

    with open(
        filename,
        "w",
        encoding="utf-8"
    ) as file:

        for doc_name in sorted(
            document_signatures
        ):

            signature = (
                document_signatures[
                    doc_name
                ]
            )

            signature_string = "".join(
                map(str, signature)
            )

            file.write(
                f"{doc_name} -> "
                f"{signature_string}\n"
            )

    print(
        "\nSignature file saved:"
    )

    print(filename)


# ============================================================
# 11. SAVE TERM SIGNATURES
# ============================================================

def save_term_signatures(
    term_signatures
):

    filename = os.path.join(
        OUTPUT_FOLDER,
        "term_signatures.txt"
    )

    with open(
        filename,
        "w",
        encoding="utf-8"
    ) as file:

        for term in sorted(
            term_signatures
        ):

            signature = (
                term_signatures[
                    term
                ]
            )

            signature_string = "".join(
                map(str, signature)
            )

            file.write(
                f"{term} -> "
                f"{signature_string}\n"
            )

    print(
        "Term signatures saved:"
    )

    print(filename)


# ============================================================
# 12. SAVE VOCABULARY
# ============================================================

def save_vocabulary(
    vocabulary
):

    filename = os.path.join(
        OUTPUT_FOLDER,
        "vocabulary.txt"
    )

    with open(
        filename,
        "w",
        encoding="utf-8"
    ) as file:

        for term in vocabulary:

            file.write(
                term + "\n"
            )

    print(
        "Vocabulary saved:"
    )

    print(filename)


# ============================================================
# 13. CHECK WHETHER SIGNATURE MATCHES
# ============================================================

def signature_match(
    document_signature,
    query_signature
):

    for i in range(
        SIGNATURE_LENGTH
    ):

        # If query requires a bit that
        # document does not contain,
        # document cannot contain query.
        if (
            query_signature[i] == 1
            and
            document_signature[i] == 0
        ):

            return False

    return True


# ============================================================
# 14. SEARCH USING SIGNATURE FILE
# ============================================================

def search_signature_file(
    query,
    documents,
    document_signatures,
    term_signatures
):

    query = query.lower().strip()

    # Check whether query exists
    if query not in term_signatures:

        print(
            "\nTerm does not exist "
            "in vocabulary."
        )

        return []

    query_signature = (
        term_signatures[
            query
        ]
    )

    candidates = []

    # Search document signatures
    for doc_name in sorted(
        document_signatures
    ):

        document_signature = (
            document_signatures[
                doc_name
            ]
        )

        if signature_match(
            document_signature,
            query_signature
        ):

            candidates.append(
                doc_name
            )

    return candidates


# ============================================================
# 15. VERIFY CANDIDATES
# ============================================================

def verify_candidates(
    query,
    candidates,
    documents
):

    query = query.lower()

    actual_documents = []

    for doc_name in candidates:

        words = preprocess(
            documents[
                doc_name
            ]
        )

        if query in words:

            actual_documents.append(
                doc_name
            )

    return actual_documents


# ============================================================
# 16. MAIN PROGRAM
# ============================================================

print("=" * 70)

print(
    "IRS LAB - SIGNATURE FILE CONSTRUCTION"
)

print("=" * 70)


# ------------------------------------------------------------
# Read Documents
# ------------------------------------------------------------

documents = read_documents(
    DOCUMENT_FOLDER
)


print(
    "\nNumber of Documents:",
    len(documents)
)


# ------------------------------------------------------------
# Build Vocabulary
# ------------------------------------------------------------

vocabulary = build_vocabulary(
    documents
)


print(
    "Vocabulary Size:",
    len(vocabulary)
)


# ------------------------------------------------------------
# Generate Term Signatures
# ------------------------------------------------------------

print(
    "\nGenerating term signatures..."
)


term_signatures = (
    generate_term_signatures(
        vocabulary
    )
)


print(
    "Term signatures generated:",
    len(term_signatures)
)


# ------------------------------------------------------------
# Generate Document Signatures
# ------------------------------------------------------------

print(
    "\nGenerating document signatures..."
)


document_signatures = (
    generate_document_signatures(
        documents,
        term_signatures
    )
)


print(
    "Document signatures generated:",
    len(document_signatures)
)


# ------------------------------------------------------------
# Save Files
# ------------------------------------------------------------

save_vocabulary(
    vocabulary
)

save_term_signatures(
    term_signatures
)

save_signature_file(
    document_signatures
)


# ------------------------------------------------------------
# Display Sample Term Signatures
# ------------------------------------------------------------

print(
    "\n" + "=" * 70
)

print(
    "SAMPLE TERM SIGNATURES"
)

print(
    "=" * 70
)


sample_terms = vocabulary[:10]


for term in sample_terms:

    signature = (
        term_signatures[
            term
        ]
    )

    print(
        f"{term:20} -> "
        f"{''.join(map(str, signature))}"
    )


# ------------------------------------------------------------
# Display Sample Document Signatures
# ------------------------------------------------------------

print(
    "\n" + "=" * 70
)

print(
    "SAMPLE DOCUMENT SIGNATURES"
)

print(
    "=" * 70
)


for doc_name in sorted(
    document_signatures
)[:5]:

    signature = (
        document_signatures[
            doc_name
        ]
    )

    print(
        f"{doc_name:15} -> "
        f"{''.join(map(str, signature))}"
    )


# ============================================================
# 17. INTERACTIVE SEARCH
# ============================================================

print(
    "\n" + "=" * 70
)

print(
    "SIGNATURE FILE SEARCH"
)

print(
    "=" * 70
)


while True:

    query = input(
        "\nEnter search term "
        "(or 'exit'): "
    ).lower().strip()


    if query == "exit":

        break


    # --------------------------------------------------------
    # Candidate retrieval
    # --------------------------------------------------------

    candidates = (
        search_signature_file(
            query,
            documents,
            document_signatures,
            term_signatures
        )
    )


    print(
        "\nCandidate Documents:"
    )


    if candidates:

        for doc in candidates:

            print(
                " ",
                doc
            )

    else:

        print(
            "No candidate documents found."
        )


    # --------------------------------------------------------
    # Verify candidates
    # --------------------------------------------------------

    actual_documents = (
        verify_candidates(
            query,
            candidates,
            documents
        )
    )


    print(
        "\nVerified Documents:"
    )


    if actual_documents:

        for doc in actual_documents:

            print(
                " ",
                doc
            )

    else:

        print(
            "No documents actually contain "
            "the query term."
        )


    # --------------------------------------------------------
    # False Positive Information
    # --------------------------------------------------------

    false_positives = (
        set(candidates)
        -
        set(actual_documents)
    )


    print(
        "\nFalse Positives:",
        len(false_positives)
    )


print(
    "\n" + "=" * 70
)

print(
    "Signature File Experiment Completed"
)

print(
    "=" * 70
)