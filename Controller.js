import { BlogModel } from "./Model.js"
import cloudinary from 'cloudinary';
export const SaveBlog = async (req, res) => {
    try {
        let cloudinaryRes;
        if (req.body.image) {
            cloudinaryRes = await cloudinary.v2.uploader.upload(req.body.image, {
                folder: "My-Blog",
                crop: "scale"
            });
        }
        const { author, title, description, category } = req.body
        await BlogModel.create({
            author, title, description, category, image: {
                public_id: cloudinaryRes.public_id,
                url: cloudinaryRes.secure_url,
            }
        })
        return res.status(200).json({
            success: true,
            message: "Data Saved successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })


    }
}

export const getBlog = async (req, res) => {
    try {
        console.log(req.body);
        const AllData = await BlogModel.find()
        res.status(200).json({
            success: true,
            AllData
        })

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params
        const getSingle = await BlogModel.findById(id)
        res.status(200).json({
            success: true,
            getSingle
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })

    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blogData = await BlogModel.findById(id)

        if (!blogData) {
            return res.status(404).json({
                success: false,
                message: "item is Not Found"
            })

        }
        await BlogModel.deleteOne({ _id: id })
        return res.status(200).json({
            success: true,
            message: "item deleted successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })

    }
}

export const editBlog = async (req, res) => {
    try {
        console.log("ajay", req.body);


        const { id } = req.params
        const Data = await BlogModel.findById(id)
        if (!Data) {
            return res.status(404).json({
                success: false,
                message: "Id Is Not updated"
            })
        }

        let cloudinaryRes;
        if (req.body.image) {
            if (Data.image && Data.image.public_id) {

                let DataImageId = Data.image.public_id

                await cloudinary.v2.uploader.destroy(DataImageId)


                cloudinaryRes = await cloudinary.v2.uploader.upload(req.body.image,
                    {
                        folder: "My-Blog",
                        crop: "scale",
                    },
                );


                Data.image = {
                    public_id: cloudinaryRes.public_id,
                    url: cloudinaryRes.secure_url
                }
                await Data.save()
            }
        }

        console.log(Data);
        const { author, title, description, category } = req.body

        if (title) {
            Data.title = title
        }

        if (description) {
            Data.description = description
        }
        if (category) {
            Data.category = category
        }
        if (author) {
            Data.author = author
        }



        await Data.save()
        return res.status(200).json({
            success: true,
            message: "item updated successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        })

    }
}