package com.booktrade.pojo;

/**   
 * @ClassName:  TreeNode   
 * @Description:书籍类目树定义  
 * @author: xander
 *      
 */  
public class TreeNode {
	
	private long id;
	private String text;
	private String state;
	
	public TreeNode(long id, String text, String state) {
		this.id = id;
		this.text = text;
		this.state = state;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}

	
}
