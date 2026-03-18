from app.models import Invoice

def create_invoice(db, data, file_path, user_id):

    total_raw = data.get("total_amount") or "0"
    total_clean = str(total_raw).replace("$", "").strip()

    invoice = Invoice(
        invoice_number=data.get("invoice_number"),
        vendor_name=data.get("vendor_name"),
        date=data.get("date"),
        # total_amount=float(data.get("total_amount", "0").replace("$", "").strip()),
        total_amount=float(total_clean),
        file_path=file_path,
        user_id=user_id
    )

    db.add(invoice)
    db.commit()
    db.refresh(invoice)

    return invoice