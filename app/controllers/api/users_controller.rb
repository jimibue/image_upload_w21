class Api::UsersController < ApplicationController
 # :authenicate_user! is defined by devise_token_auth
  # check if the token is valid
  # if successfull we will have access to current_user
  # current_user is defined by devise_token_auth
  before_action :authenticate_user!

  def image_demo_1
    file = params[:fileYo]

    # is trying trying to save the image to cloudinary
    if file
        begin
          # ext = File.extname(file.tempfile)
          puts 'Trying to save to cloudinary'
          cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
      
        rescue => e
          puts "error"
          puts e  
          render json: { errors: e }, status: 422
          return
        end
    end

    # save/update to database
    if cloud_image && cloud_image['secure_url'] 
      current_user.image = cloud_image['secure_url']
    end

    current_user.nickname = params[:nickname]
    if current_user.save
      render json: current_user
    else
      render json: { errors: e }, status: 422
    end

  end
end
