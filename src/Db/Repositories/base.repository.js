
export class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    createDocument(data) {
        return this.model.create(data);
    }

    findOneDocument(filter, projection = {}) {
        return this.model.findOne(filter, projection);
    }

    findDocumentById(id, projection = {}) {
        return this.model.findById(id, projection);
    }

    findAllDocuments(filter = {}, projection = {}) {
        return this.model.find(filter, projection);
    }

    updateDocumentById(id, data, options = { new: true }) {
        return this.model.findByIdAndUpdate(id, data, options);
    }

    deleteDocumentById(id) {
        return this.model.findByIdAndDelete(id);
    }
}
