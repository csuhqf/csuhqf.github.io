"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./CertificateModal.module.css";

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    title: string;
}

export default function CertificateModal({ isOpen, onClose, imageSrc, title }: CertificateModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.imageContainer}>
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={800}
                        height={600}
                        className={styles.image}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
