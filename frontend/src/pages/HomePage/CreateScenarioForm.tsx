import { JSX, useState } from "react";
import axiosInstance from "../../utils/axios";
import "./createform.css";

export default function CreateScenarioForm(): JSX.Element {
    const [formData, setFormData] = useState({
        scenario_name: "",
        vocabulary: "",
        level: "",
        description: "",
        image_path: ""  // Add this
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Convert comma-separated string to array
            const vocabularyList = formData.vocabulary
                .split(',')
                .map(v => v.trim())
                .filter(v => v !== ''); // Remove empty strings

            const payload = {
                ...formData,
                vocabulary: vocabularyList
            };

            console.log(payload)

            const response = await axiosInstance.post("/scenarios/", payload)

            if (response) {
                setFormData({ scenario_name: "", vocabulary: "", level: "", description: "", image_path: "" });
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
                <input
                    type="text"
                    name="scenario_name"
                    value={formData.scenario_name}
                    onChange={handleChange}
                    required
                    placeholder="Scenario Name"
                    className="form-input"
                />

                <input
                    type="text"
                    name="vocabulary"
                    value={formData.vocabulary}
                    onChange={handleChange}
                    required
                    placeholder="Vocabulary"
                    className="form-input"
                />

                <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="form-input"
                >
                    <option value="">Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Description"
                    rows={4}
                    className="form-input"
                />

                <input
                    type="text"
                    name="image_path"
                    value={formData.image_path}
                    onChange={handleChange}
                    placeholder="Image URL (optional)"
                    className="form-input"
                />

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}