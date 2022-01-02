package main

import (
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"
	"fyne.io/fyne/v2/dialog"
	"strconv"
	"io/ioutil"
	"fyne.io/fyne/v2/storage"
)
var count int  = 1;

func showTextEditor(w fyne.Window) {
	// a := app.New()
	// w := a.NewWindow("Text Editor")
	// w.Resize(fyne.NewSize(500, 500));

	content := container.NewVBox(
		container.NewHBox(
			 widget.NewLabel("Text Editor"),
		),
	)

	content.Add(widget.NewButton("Add new file " , func(){
		content.Add(widget.NewLabel("New File" + strconv.Itoa(count)))
		count++
	}))
	input := widget.NewMultiLineEntry();
	input.SetPlaceHolder("Enter text here....")

	saveBtn := widget.NewButton("Save Text File" ,  func(){
      saveFileDialog := dialog.NewFileSave(
		  func( uc fyne.URIWriteCloser, _ error){
				textData := []byte(input.Text)
				uc.Write(textData)
		  },w)
		  saveFileDialog.SetFileName("New File" + strconv.Itoa(count-1)+".txt")
		  saveFileDialog.Show()
	})

	openBtn := widget.NewButton("Open Text File" ,  func(){
		openFileDialog := dialog.NewFileOpen(
			func( r fyne.URIReadCloser, _ error){
				  ReadData,_ := ioutil.ReadAll(r)

				  output := fyne.NewStaticResource("New File " , ReadData)

				  viewData :=  widget.NewMultiLineEntry()

				  viewData.SetText(string(output.StaticContent))

				  w:= fyne.CurrentApp().NewWindow(
					  string(output.StaticName))
					  w.SetContent(container.NewScroll(viewData))
					  w.Resize(fyne.NewSize(200 ,200))
					  w.Show()
			},w)
			openFileDialog.SetFilter(
					storage.NewExtensionFileFilter([]string{".txt"}))
			openFileDialog.Show()
	  })
	
	// w.SetContent(
	// 	container.NewVBox(
	// 		content,
	// 		input,
	// 		container.NewHBox(
	// 			saveBtn,
	// 			openBtn,
	// 		),
	// 	),
	// )
	textContainer:=container.NewVBox(
				content,
				input,
				container.NewHBox(
					saveBtn,
					openBtn,
				),
	)
	// w:=myApp.NewWindow("Editor");
	// w.Resize(fyne.NewSize(500 , 350));
	w.SetContent(
		container.NewBorder(DeskBtn,nil,nil,nil,textContainer),
	)
	w.Show()
}
