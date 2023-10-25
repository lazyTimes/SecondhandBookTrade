package com.booktrade.service;

import org.springframework.web.multipart.MultipartFile;

import com.booktrade.pojo.PictureResult;


/**   
 * @ClassName:  PictureService   
 * @Description:上传图片处理Service   
 * @author: xander
 *      
 */  
public interface PictureService {

	PictureResult uploadPicture(MultipartFile uploadFile,String se);
}
