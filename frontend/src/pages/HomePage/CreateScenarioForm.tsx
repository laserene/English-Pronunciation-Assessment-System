import { JSX, useState } from "react";
import axiosInstance from "../../utils/axios";
import "./createform.css";

export default function CreateScenarioForm(): JSX.Element {
    const [formData, setFormData] = useState({
        scenario_name: "",
        vocabulary: "",
        level: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Convert comma-separated string to array
            const vocabularyList = formData.vocabulary
                .split(',')
                .map(v => v.trim())
                .filter(v => v !== '');

            // Create FormData for file upload
            const payload = new FormData();
            payload.append('scenario_name', formData.scenario_name);
            payload.append('vocabulary', JSON.stringify(vocabularyList));
            payload.append('level', formData.level);
            payload.append('description', formData.description);

            if (imageFile) {
                payload.append('image', imageFile);
            }

            console.log('Submitting:', formData, imageFile);

            const response = await axiosInstance.post("/scenarios/", payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response) {
                // Reset form
                setFormData({ scenario_name: "", vocabulary: "", level: "", description: "" });
                setImageFile(null);
                setImagePreview("");

                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-form-container">
            <h2 className="create-form-title">New Scenario</h2>

            <form onSubmit={handleSubmit} className="create-form">
                <div className="form-group">
                    <label className="form-label">Scenario Name</label>
                    <input
                        type="text"
                        name="scenario_name"
                        value={formData.scenario_name}
                        onChange={handleChange}
                        required
                        placeholder="Enter scenario name"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Vocabulary (comma-separated)</label>
                    <input
                        type="text"
                        name="vocabulary"
                        value={formData.vocabulary}
                        onChange={handleChange}
                        required
                        placeholder="e.g., hello, goodbye, thank you"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Level</label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Describe the scenario..."
                        rows={4}
                        className="form-input form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Scenario Image (optional)</label>

                    {!imagePreview ? (
                        <label className="file-upload-label">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="file-upload-input"
                            />
                            <div className="file-upload-box">
                                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="upload-text">Click to upload image</p>
                                <p className="upload-hint">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </label>
                    ) : (
                        <div className="image-preview-container">
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                            <button type="button" onClick={removeImage} className="remove-image-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Scenario"}
                </button>
            </form>
        </div>
    );
}